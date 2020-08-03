const { youtube, genius_PRD, genius_DEV, mxm } = require("./credentials.json");

module.exports = {
  JWTsecret: "mysecret",

  youtube: {
    api_key: youtube.api_key,
    oauth2credentials: {
      client_id: youtube.web.client_id,
      client_secret: youtube.web.client_secret
    },
    scope: "https://www.googleapis.com/auth/youtube.readonly",
  },

  genius_PRD: {
    client_id: genius_PRD.client_id,
    client_secret: genius_PRD.client_secret,
    state: genius_PRD.state,
    scope: genius_PRD.scope,
  },

  genius_DEV: {
    client_id: genius_DEV.client_id,
    client_secret: genius_DEV.client_secret,
    state: genius_DEV.state,
    scope: genius_DEV.scope,
  },

  mxm: {
    api_key: mxm.api_key
  }
};
