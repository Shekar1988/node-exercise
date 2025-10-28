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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params; // date is string or undefined

  let unix, utc;

  if (!date) {
    // Empty param: Return current time
    unix = Date.now();
    utc = new Date().toUTCString();
    return res.json({ unix, utc });
  }

  // Try as Unix timestamp (number string)
  if (!isNaN(date) && !isNaN(parseInt(date))) {
    unix = parseInt(date);
    utc = new Date(unix).toUTCString();
    // Validate: Ensure it's a plausible date (e.g., not NaN after new Date)
    if (isNaN(new Date(unix).getTime())) {
      return res.json({ error: "Invalid Date" });
    }
    return res.json({ unix, utc });
  }

  // Treat as date string: Parse and validate
  const parsedDate = new Date(date);
  if (!isNaN(parsedDate.getTime())) {
    unix = parsedDate.getTime();
    utc = parsedDate.toUTCString();
    return res.json({ unix, utc });
  }

  // Invalid: Fallback error
  res.json({ error: "Invalid Date" });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
