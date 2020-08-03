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

There are two Genius clients set up here, one for production and another for development. This is because each client only allows one origin URI and one redirect URI, hence the two clients. The YouTube client, on the other hand, lets us add multiple endpoints to a single client.

### Set up your API clients

The react app runs on `port 3000` and the server app runs on `port 5000`.

The server app makes all of the API calls, so use `http://localhost:5000` as your origin URI when setting up your API clients (Google, Genius, etc.). 

Use `http://localhost:5000/['genius' or 'youtube']/oauth2callback` as the redirect URI.

### Edit your server

`server.js` can use one of two `routes` files. One for dev testing `routes_DEV.js` and another for deployment `routes.js`.

Uncomment the correct file `routes_DEV.js` in `server.js`.

### Install packages
Start in the root folder: `yarn install` && `cd client && yarn install` or use `npm` if you prefer.

### Run the project
`yarn run dev` or `npm run dev` - depending on which package manager you use.

#### The project is now running in a DEV environment!

Thanks for checking out this project
