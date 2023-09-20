const { Pool } = require("pg");

const connectDb = new Pool({
    user: "postgres",
    host: "localhost",
    database: "TAS_API",
    password: "utsav@164",
    port: 5432,
});

connectDb.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
  
module.exports = connectDb;


