const express = require("express");

const router = express.Router();
const DashboardController = require("../controllers/DashboardController");

//console.log("In Interviews Route");

//get total Events
router.get("/getEventsCount", (req, res) => {
    DashboardController.getEvents(req, res);
});

//get total interviews
router.get("/getInterviewsCount", (req, res) => {
  DashboardController.getInterviews(req, res);
});

//get total candidates
router.get("/getCandidatesCount", (req, res) => {
  DashboardController.getCandidates(req, res);
});

//get candidate status
router.get("/getCandidateStatus", (req, res) => {
  DashboardController.getCandidateStatus(req, res);
});

//get upcoming interviews
router.get("/getUpcomingInterviews", (req, res) => {
  DashboardController.getUpcomingInterviews(req, res);
});

module.exports = router;
