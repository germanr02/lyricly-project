const config = require("./config");
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const axios = require("axios");

/* ------------------------REDIRECT URIs-------------------------- */
const redirect_uri = "https://lyricly.net";
const home_uri = "https://lyricly.net";
// const redirect_uri = "http://localhost:5000";
// const home_uri = "http://localhost:3000";

/* ----------------------- CREDENTIALS/CLIENTS-------------------------- */
const youtubeOauth2 = new google.auth.OAuth2(
  config.youtube.oauth2credentials.client_id,
  config.youtube.oauth2credentials.client_secret,
  `${redirect_uri}/youtube/oauth2callback`
);

const geniusCredentials = {
  client: {
    id: config.genius_PRD.client_id,
    secret: config.genius_PRD.client_secret,
  },
  auth: {
    tokenHost: "http://api.genius.com",
  },
};

const geniusOauth2 = require("simple-oauth2").create(geniusCredentials);

/* ------------------------GET AUTH URLs-------------------------- */
router.get("/authUrls", (req, res) => {
  const youtube = youtubeOauth2.generateAuthUrl({
    access_type: "offline",
    scope: config.youtube.scope,
  });
  const genius = geniusOauth2.authorizationCode.authorizeURL({
    redirect_uri: `${redirect_uri}/genius/oauth2callback`,
    scope: config.genius_PRD.scope,
    state: config.genius_PRD.state,
    response_type: "code",
  });
  req.authUris = {
    youtube,
    genius,
  };
  res.send(req.authUris);
});

/* ------------------------YOUTUBE oauth2callback-------------------------- */
router.get("/youtube/oauth2callback", (req, res, next) => {
  if (req.query.error) {
    console.log({
      msg: "User didn't grant permission",
      error: req.query.error,
    });
    next(req.query.error);
    return res.redirect(home_uri + "/accessdenied");
  } else {
    youtubeOauth2.getToken(req.query.code, (err, tokens) => {
      if (err) {
        console.log(err);
        return res.redirect(home_uri + "/error");
      } else {
        res.cookie("ytJwt", jwt.sign(tokens, config.JWTsecret));
        console.log(tokens.access_token);
        return res.redirect(home_uri);
      }
    });
  }
});

/* ------------------------GENIUS oauth2callback-------------------------- */
router.get("/genius/oauth2callback", async (req, res, next) => {
  const tokenConfig = {
    code: req.query.code,
    redirect_uri: `${redirect_uri}/genius/oauth2callback`,
    scope: config.genius_PRD.scope,
  };

  try {
    const result = await geniusOauth2.authorizationCode.getToken(tokenConfig);
    const accessToken = geniusOauth2.accessToken.create(result).token;
    res.cookie("geniusJwt", jwt.sign(accessToken, config.JWTsecret));
    res.redirect(home_uri);
  } catch (error) {
    return res.redirect(home_uri + "/accessdenied");
  }
});

/* ------------------------YOUTUBE revokeCredentials-------------------------- */
router.get("/youtube/revokeCredentials", (req, res, next) => {
  try {
    youtubeOauth2.revokeCredentials((err, data) => {
      if (err) next(err);
      else res.send(data);
    });
    res.clearCookie("ytJwt");
  } catch (error) {
    console.log(error);
  }
});

/* ------------------------GENIUS revokeCredentials-------------------------- */
router.get("/genius/revokeCredentials", async (req, res, next) => {
  try {
    res.clearCookie("geniusJwt");
    res.send("Ok");
  } catch (error) {
    console.log("Error revoking token: ", error.message);
  }
});

/* ------------------------YOUTUBE INIT -------------------------- */
const youtubeClientInit = (req, res, next) => {
  if (req.cookies.ytJwt) {
    try {
      youtubeOauth2.credentials = jwt.verify(
        req.cookies.ytJwt,
        config.JWTsecret
      );
    } catch (err) {
      console.log(error);
      youtubeOauth2.credentials = null;
    }
  }
  const ytAuth = req.cookies.ytJwt ? youtubeOauth2 : config.youtube.api_key;
  req.ytAuthorized = ytAuth === config.youtube.api_key ? false : true;

  req.youtube = google.youtube({
    version: "v3",
    auth: ytAuth,
  });
  next();
};

/* ------------------------GET YOUTUBE ACCOUNT-------------------------- */
const youtubeAccount = (req, res, next) => {
  if (req.ytAuthorized) {
    req.youtube.channels
      .list({
        part: "snippet",
        fields: "items(snippet(title))",
        mine: true,
      })
      .then((response) => {
        req.youtube = response.data.items[0].snippet.title;
        next();
      })
      .catch((error) => {
        req.youtube = null;
        console.log(error);
        next();
      });
  } else {
    req.youtube = null;
    next();
  }
};

/* ------------------------GET GENIUS ACCOUNT-------------------------- */
const geniusAccount = (req, res, next) => {
  if (req.cookies.geniusJwt) {
    try {
      const { access_token } = jwt.verify(
        req.cookies.geniusJwt,
        config.JWTsecret
      );
      axios
        .get("https://api.genius.com/account", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          req.genius = response.data.response.user.name;
          next();
        })
        .catch((error) => {
          res.send(error);
        });
    } catch (error) {
      req.genius = null;
      console.log(error);
    }
  } else {
    req.genius = null;
    next();
  }
};

/* ------------------------GET ACCOUNTS-------------------------- */
router.get(
  "/getAccounts",
  [youtubeClientInit, youtubeAccount, geniusAccount],
  (req, res) => {
    const accounts = {
      youtube: req.youtube,
      genius: req.genius,
    };
    res.send(accounts);
  }
);

router.get("/youtube/search/:query", [youtubeClientInit], (req, res) => {
  req.youtube.search
  .list({
    part: "id, snippet",
    fields:
      "items(id(videoId), etag, snippet(title, channelTitle, channelId, thumbnails(medium)))",
    q: req.params.query,
    type: "video",
    maxResults: 24,
  })
  .then((response) => {
    const youtube = response.data.items;
    res.send(youtube);
  })
  .catch((err) => {
    const error = err.response.data.error.message;
    const youtube = { error };
    res.send(youtube)
  });
});

/* ------------------------INDEPENDENT GENIUS SEARCH RESULT ROUTE-------------------------- */
router.get("/genius/search/:query", (req, res) => {
  try {
    // const accessToken = jwt.verify(req.cookies.geniusJwt, config.JWTsecret)
    //   .access_token;
    const accessToken = config.genius_PRD.access_token;
    axios
      .get(`https://api.genius.com/search?q=${req.params.query}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        res.send(response.data.response.hits);
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send("error");
  }
});

/* ------------------------GET SONG DATA FROM GENIUS-------------------------- */
router.get("/genius/songs/:id", (req, res) => {
  try {
    // const accessToken = jwt.verify(req.cookies.geniusJwt, config.JWTsecret)
    //   .access_token;
    const accessToken = config.genius_PRD.access_token;
    axios
      .get(`https://api.genius.com/songs/${req.params.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const song = response.data.response.song;
        var youtubeMedia = song.media.find((m) => m.provider === "youtube");
        youtubeMedia = youtubeMedia ? youtubeMedia.url : null;
        var spotifyMedia = song.media.find((m) => m.provider === "spotify");
        spotifyMedia = spotifyMedia ? spotifyMedia.url : null;

        const songData = {
          url: song.url,
          fullTitle: song.full_title,
          title: song.title,
          artist: song.primary_artist.name,
          albumArt: song.album
            ? song.album.cover_art_url
            : song.song_art_image_url,
          songArt: song.song_art_image_url,
          songRelationships: {
            samples: song.song_relationships.find(
              (r) => r.type === "samples"
            ).songs,
            sampled_in: song.song_relationships.find(
              (r) => r.type === "sampled_in"
            ).songs,
            covered_by: song.song_relationships.find(
              (r) => r.type === "covered_by"
            ).songs,
            remixed_by: song.song_relationships.find(
              (r) => r.type === "remixed_by"
            ).songs,
            interpolates: song.song_relationships.find(
              (r) => r.type === "interpolates"
            ).songs
          },
          media: {
            youtube: youtubeMedia,
            spotify: spotifyMedia,
          },
          description: song.description.dom.children,
        };
        res.send(songData);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

/* ------------------------GET YOUTUBE ACCOUNT PLAYLISTS-------------------------- */
router.get("/youtube/playlists", [youtubeClientInit], (req, res) => {
  req.youtube.playlists
    .list({
      part: "snippet",
      fields:
        "items(id, etag, snippet(title, channelTitle, channelId, thumbnails(medium)))",
      maxResults: 25,
      mine: true,
    })
    .then((response) => {
      req.youtube = response.data.items;
      res.send(req.youtube);
    })
    .catch((error) => {
      console.log(error);
      req.youtube = [];
      res.send(req.youtube);
    });
});

/* ------------------------GET YOUTUBE ACCOUNT PLAYLISTS-------------------------- */
router.get("/youtube/playlist/items/:id", [youtubeClientInit], (req, res) => {
  req.youtube.playlistItems
    .list({
      part: "snippet",
      fields:
        "items(id, etag, snippet(title, channelTitle, channelId, thumbnails(medium), resourceId(videoId)))",
      playlistId: req.params.id,
    })
    .then((response) => {
      req.youtube = response.data.items;
      res.send(req.youtube);
    })
    .catch((error) => {
      console.log(error);
      req.youtube = [];
      res.send(req.youtube);
    });
});

/* ------------------------GET MUSIXMATCH TRACK-------------------------- */
router.get("/mxm/searchLyrics/:artist/:track", (req, res) => {
  const artist = encodeURIComponent(req.params.artist);
  const track = encodeURIComponent(req.params.track);
  axios
    .get(
      `https://api.musixmatch.com/ws/1.1/track.search?q_artist=${artist}&q_track=${track}&f_has_lyrics=1&page=1&page_size=5&s_track_rating=desc&apikey=${config.mxm.api_key}`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/mxm/getLyrics/:track_id", (req, res) => {
  axios
    .all([
      axios.get(
        `https://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=${req.params.track_id}&apikey=${config.mxm.api_key}`
      ),
      axios.get(
        `https://api.musixmatch.com/ws/1.1/track.get?commontrack_id=${req.params.track_id}&apikey=${config.mxm.api_key}`
      ),
    ])
    .then(
      axios.spread((lyrics, track) => {
        const data = {
          lyrics: lyrics.data.message.body.lyrics,
          track: track.data.message.body.track,
        };
        res.json(data);
      })
    )
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
