const express = require("express");

const router = express.Router();
const EventController = require("../controllers/EventController");

//console.log("In Interviews Route");

//get all Events
router.get("/", (req, res) => {
    EventController.getAllEvents(req, res);
});

//get Events by id
router.get("/:id", (req, res) => {
    EventController.getEventsById(req, res);
});

//create Events
router.post("/add", (req, res) => {
    EventController.createEvents(req, res);
});

//update interview
router.put("/update/:id", (req, res) => {
    EventController.updateEvents(req, res);
});

//delete interview by id
router.delete("/delete/:id", (req, res) => {
    EventController.deleteEvents(req, res);
});

module.exports = router;
