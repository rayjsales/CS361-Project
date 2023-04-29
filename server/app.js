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
// Get Cities from the database, only where there are restaurants
app.get("/cities", function (req, res) {
  let query = `SELECT DISTINCT SUBSTRING(SUBSTRING_INDEX(SUBSTRING_INDEX(Restaurants.full_address, ',', 3), ',', -2), 2) as city FROM Restaurants INNER JOIN RestaurantMenus ON Restaurants.id = RestaurantMenus.restaurant_id WHERE full_address LIKE '%,%' AND full_address NOT LIKE '%,%,%,%,%';`;
  db.pool.query(query, function (err, results, fields) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      res.send(JSON.stringify(results));
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

// Get dishes from database
app.get("/dishes", (req, res) => {
  const cuisine = req.query.param1;
  const city = req.query.param2;
  // Use the citySearch to fetch data from database
  let query = `SELECT DISTINCT RestaurantMenus.category FROM Restaurants JOIN RestaurantMenus ON Restaurants.id = RestaurantMenus.restaurant_id WHERE Restaurants.category Like '%${cuisine}%' AND Restaurants.full_address LIKE '%${city}%';`;
  db.pool.query(query, function (err, results, fields) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      res.send(JSON.stringify(results));
    }
  });
});

// Get the meals based on the city entered, cusine and if included the dishe
app.get("/meals", (req, res) => {
  console.log(req.query);
  const cuisine = req.query.cuisine;
  const city = req.query.city;
  if (req.query.dish) {
    const dish = req.query.dish;
    let query = `SELECT t1.name, t1.description, t1.price, t2.name restaurant, t2.full_address FROM RestaurantMenus t1 INNER JOIN Restaurants t2 ON t1.restaurant_id = t2.id WHERE t2.category Like '%${cuisine}%' AND t2.full_address Like '%${city}%' AND t1.category = '${dish}';`;
    db.pool.query(query, function (err, results, fields) {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        const newMeals = results.map((meal, index) => {
          const price = parseFloat(meal.price);
          const formattedPrice = price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          });
          return {
            ...meal,
            id: index + 1,
            price: formattedPrice,
          };
        });
        res.send(JSON.stringify(newMeals));
      }
    });
  } else {
    let query = `SELECT t1.name, t1.description, t1.price, t2.name restaurant, t2.full_address FROM RestaurantMenus t1 INNER JOIN Restaurants t2 ON t1.restaurant_id = t2.id WHERE t2.category Like '%${cuisine}%' AND t2.full_address Like '%${city}%';`;
    db.pool.query(query, function (err, results, fields) {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        const newMeals = results.map((meal, index) => {
          const price = parseFloat(meal.price);
          const formattedPrice = price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          });
          return {
            ...meal,
            id: index + 1,
            price: formattedPrice,
          };
        });
        res.send(JSON.stringify(newMeals));
      }
    });
  }
});

/*
    LISTENER
*/
app.listen(PORT, function () {
  console.log(
    "Express started on http://localhost:" + PORT + "; press Ctrl-C to terminate."
  );
});
