// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require("mysql2");
require("dotenv").config();

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: "mydb",
});

// Export it for use in our applicaiton
module.exports.pool = pool;
