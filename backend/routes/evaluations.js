const express = require("express");
const EvaluationController = require("../controllers/EvaluationController");

const router = express.Router();


// console.log("In Evaluation Route");

// Get all Evaluations details
router.get("/", (req, res) => {
  EvaluationController.getAllEvaluations(req, res);
});

// Get Evaluations details by Evaluation id 
router.get("/:id", (req, res) => {
  EvaluationController.getEvaluationById(req, res);
});

// Add Evaluations details
router.post("/add",(req,res)=>{
  EvaluationController.addEvaluation(req,res);
});

//update Evaluation
router.put("/update/:id", (req, res) => {
  EvaluationController.updateEvaluations(req, res);
});

module.exports = router;
