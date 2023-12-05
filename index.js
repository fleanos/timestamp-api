// index.js

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

app.get(
  "/api/:date",
  (req, res, next) => {
    !isNaN(new Date(req.params.date)) ? req.unix = Date.parse(req.params.date) : req.unix = parseInt(req.params.date);
    req.time = new Date(req.unix).toUTCString();
    next();
  },
  (req, res) => {
    isNaN(req.unix) ? res.json({ error: "Invalid Date" }) : res.json({ unix: req.unix, utc: req.time });
  }
);

app.get(
  "/api",
  (req, res, next) => {
    req.unix = Date.now();
    req.time = new Date(req.unix).toUTCString();
    next();
  },
  (req, res) => {
    res.json({ unix: req.unix, utc: req.time });
  }
);
