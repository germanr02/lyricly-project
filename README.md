# lyricly-proto
A simple interface to explore and learn more about the music you love: https://lyricly.net

This app uses various APIs (Genius, YouTube, MusixMatch, Spotify) to search and explore content about music.

---
## How to use the app:
This is a simple search engine for music videos and lyrics. Simply search a music title in the search bar and results will come up on the search results component, results provided by the Genius API. Click on a Song Title from the results to automatically search for lyrics, provided by the Musixmatch API. Click on the "Watch Related Video" link to automatically start the Music Video, provided by the YouTube API. Click on the "More" tab to view more Details on the selected song, content provided by the Genius API. Scroll down to view other content related to the song. Click on related music to view content on the related song. Use the front and back arrows at the top of the "More" tab navigate through your exploration history.

---

## Getting Started
### Add the necessary info

To make the project work you need a `"credentials.json"` file.

Create it in the `/api` folder and use the following format:

```
{
  "youtube": {
    "api_key": "API_KEY",
    "web": {
      "client_id": "CLIENT_ID",
      "client_secret": "CLIENT_SECRET"
    }
  },
  "genius_PRD": {
    "client_id": "CLIENT_ID",
    "client_secret": "CLIENT_SECRET",
    "state": "RANDOM_STRING",
    "scope": "me"
  },
  "genius_DEV": {
    "client_id": "CLIENT_ID",
    "client_secret": "CLIENT_SECRET",
    "state": "RANDOM_STRING",
    "scope": "me"
  },
  "mxm": {
    "api_key": "API_KEY"
  },
  "JWTsecret": "RANDOM_STRING"
}
```

`config.js` gets all its info from this file.

There are two Genius clients set up here, one for production and another for development. This is because each Genius client allows only one origin URI and one redirect URI, hence the two clients - one for making requests from localhost and for prodcution testing.

The YouTube client, on the other hand, lets you add multiple endpoints to a single client, thus we only need one for dev and prd.

### Set up your API clients

The react app runs on `port 3000` and the server app runs on `port 5000`.

The server makes all of the API calls, so use `http://localhost:5000` as the origin URI when setting up your API clients (Google, Genius, etc.). 

Use `http://localhost:5000/<'genius' or 'youtube'>/oauth2callback` as the redirect URIs.

### Edit your server

`server.js` uses one of the two `routes` files. One for dev testing `routes_DEV.js` and another for prod `routes.js`.

### Install packages
Start in the root folder and run `yarn install`, then `cd client && yarn install` or use `npm` if you prefer.

### Run the project
`yarn run dev` or `npm run dev` from the root folder - depending on which package manager you use.

#### The project should now be running in development!
