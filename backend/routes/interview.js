const express = require("express");

const router = express.Router();
const InterviewController = require("../controllers/InterviewController");

console.log("In Interviews Route");

//get all interviews
router.get("/", (req, res) => {
    InterviewController.getAllInterviews(req, res);
});

//get interview by id
router.get("/:id", (req, res) => {
    InterviewController.getInterviewsById(req, res);
});

//create interview
router.post("/add", (req, res) => {
    InterviewController.createInterviews(req, res);
});

//update interview
router.put("/update/:id", (req, res) => {
    InterviewController.updateInterviews(req, res);
});

//delete interview by id
router.delete("/delete/:id", (req, res) => {
    InterviewController.deleteInterviews(req, res);
});

module.exports = router;
