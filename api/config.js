const { youtube, genius_PRD, genius_DEV, mxm, JWTsecret } = require("./credentials.json");

module.exports = {
  JWTsecret: JWTsecret,

  youtube: {
    api_key: youtube.api_key,
    oauth2credentials: {
      client_id: youtube.web.client_id,
      client_secret: youtube.web.client_secret
    },
    scope: "https://www.googleapis.com/auth/youtube.readonly",
  },

  genius_PRD: {
    access_token: genius_PRD.access_token,
    client_id: genius_PRD.client_id,
    client_secret: genius_PRD.client_secret,
    state: genius_PRD.state,
    scope: genius_PRD.scope,
  },

  genius_DEV: {
    access_token: genius_DEV.access_token,
    client_id: genius_DEV.client_id,
    client_secret: genius_DEV.client_secret,
    state: genius_DEV.state,
    scope: genius_DEV.scope,
  },

  mxm: {
    api_key: mxm.api_key
  }
};
