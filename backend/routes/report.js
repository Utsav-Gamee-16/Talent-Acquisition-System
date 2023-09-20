const express = require("express");

const router = express.Router();
const ReportController = require("../controllers/ReportController");

//console.log("In Report Route");

// Get All report details 
router.get("/", (req, res) => {
    ReportController.getReports(req, res);
  });



module.exports = router;
