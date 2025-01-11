// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Example API endpoint to get Unix timestamp in JSON
app.get("/api/:date", function (req, res) {
  const dateParam = req.params.date;
  
  // Try to parse the date
  let date;
  if (isNaN(dateParam)) {
    // If the parameter is not a number, try to parse it as a date string
    date = new Date(dateParam);
  } else {
    // If it's a number, treat it as a Unix timestamp (milliseconds)
    date = new Date(parseInt(dateParam));
  }

  // Check if the date is valid
  if (date instanceof Date && !isNaN(date)) {
    // If valid, return the Unix timestamp and UTC string in JSON
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } else {
    // If invalid, return an error response
    res.json({ error: "Invalid Date" });
  }
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
