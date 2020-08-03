# lyricly-proto
A simple interface to explore and learn more about the music you love: https://lyricly.net

This app uses various APIs (Genius, YouTube, MusixMatch) to search and gather content about music.

While not complete and could use infinite changes and improvements, it serves as a prototype for a fun (and potentially useful) web application.

I will continue to maintiain and upgrade the project over time.

## Getting Started
### Add the necessary info

To make the project work you need one thing... a `"credentials.json"` file.

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

Genius has two clients, one for production and another for development. This is because each client only allowed me to set one origin URI and one redirect URI,
hence the two clients.

### Set up your API clients

The react app runs on `port 3000` and the server app runs on `port 5000`.

The server makes all of the API calls, so use `http://localhost:5000` as your origin and `http://localhost:5000/['genius' or 'youtube']/oauth2callback` as the redirect URI when setting up your API clients (Google, Genius, etc.)

### Edit your server

`server.js` can use one of two `routes` files. One for dev testing (`routes_DEV.js`) and another for deployment (`routes.js`).

Uncomment the correct file (`DEV`) in `server.js`.

### Install packages
Start in the root folder: `yarn install` && `cd client && yarn install` or `npm` if you prefer.

### Run the project
`yarn run dev` or `npm run dev` - depending on which package manager you use.

Thanks for checking out this project!
