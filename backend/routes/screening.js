const express = require("express");

const router = express.Router();
const ScreeningController = require("../controllers/ScreeningController");

//console.log("In Screening Route");

// Get All screening details 
router.get("/", (req, res) => {
    ScreeningController.getAllScreenings(req, res);
  });

// Get screening details by screening id 
router.get("/:id", (req, res) => {
    ScreeningController.getScreeningById(req, res);
});

//add screening details
router.post("/add",(req,res)=>{
    ScreeningController.addScreening(req,res);
})
module.exports = router;
