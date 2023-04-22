// App.js

/*
    SETUP
*/
var express = require("express");
const cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
PORT = 9124;
var db = require("./database/db-connector");

/*
    ROUTES
*/
app.get("/cities", function (req, res) {
  let query = `SELECT DISTINCT SUBSTRING(SUBSTRING_INDEX(SUBSTRING_INDEX(full_address, ',', 3), ',', -2), 2) FROM Restaurants WHERE full_address LIKE '%,%' AND full_address NOT LIKE '%,%,%,%,%';`;
  db.pool.query(query, function (err, results, fields) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      const cities = results.map((result) => {
        return {
          city: result[
            `SUBSTRING(SUBSTRING_INDEX(SUBSTRING_INDEX(full_address, ',', 3), ',', -2), 2)`
          ],
        };
      });
      res.send(JSON.stringify(cities));
    }
  });
});

// Get cuisines from database, but then need to run microservice to get the just cuisines.
app.get("/cuisines", (req, res) => {
  const citySearch = req.query.param;
  // Use the citySearch to fetch data from database
  let query = `Select category from Restaurants where BINARY full_address LIKE '%${citySearch}%';`;
  db.pool.query(query, function (err, results, fields) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      res.send(JSON.stringify(results));
    }
  });
});

/*
    LISTENER
*/
app.listen(PORT, function () {
  console.log(
    "Express started on http://localhost:" + PORT + "; press Ctrl-C to terminate."
  );
});
