// App.js

/*
    SETUP
*/
var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
PORT = 9124;
var db = require("./database/db-connector");

/*
    ROUTES
*/
app.get("/", function (req, res) {
  let query = "SELECT * FROM Restaurants;";
  db.pool.query(query, function (err, results, fields) {
    console.log(results);
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
