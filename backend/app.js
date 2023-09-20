const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbClient = require("./utils/database");

// var dbCreate = require('./models/database');
dbClient.connect()

require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "300mb" }));
app.use((error, req, res, next) => {
  // Catch json error
  if (error instanceof Error) {
    res.status(400).send({
      message: "Invalid JSON Format",
    });
  } else {
    next();
  }
});
app.use(bodyParser.raw({ limit: "300mb" }));
app.use(bodyParser.urlencoded({ extended: true })); //for fileupload
app.use(cookieParser());

const index = require("./routes/index");

app.use("/api", index);
app.use("/cv",express.static("./cv"));
app.listen(3000,()=>{console.log("listen on 3000")})

module.exports = app;
