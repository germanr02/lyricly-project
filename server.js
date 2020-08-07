const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

app.use(cookieParser());

app.use("/", require("./api/routes"));
// app.use("/", require("./api/routes_DEV"));

// Server build if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

  console.log("App is running production build.")
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}.`);
});
