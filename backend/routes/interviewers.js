const express = require("express");
const router = express.Router();
const InterviewersController = require("../controllers/InterviewersController");

//console.log("In Interviewers Route");

// Get all interviewers details
router.get("/", (req, res) =>{
    InterviewersController.getAllInterviewers(req, res);
});

//Get interviewers details from users table
router.get("/getInterviewers", (req, res) => {
    InterviewersController.getInterviewersFromUsers(req, res);
  });

// Get interviewers details by interviewer id
router.get("/:id", (req, res) =>{
    InterviewersController.getInterviewerById(req, res);
});

// Add interviewers details
router.post("/add",(req,res)=>{
    InterviewersController.addInterviewer(req, res);
})

// Remove interviewers details by interviewer id
router.delete("/delete/:id",(req,res)=>{
    InterviewersController.removeInterviewer(req, res);
})

// Update interviewers details by interviewer id
router.put("/update/:id",(req,res)=>{
    InterviewersController.updateInterviewer(req, res);
})


module.exports = router;
