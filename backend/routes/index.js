const express = require("express");

const router = express.Router();
const CommonError = require("../utils/commonErrors");

const logger = require("../config/logger");
logger.info("Defining routes...");

router.use("/users", require("./user"));
router.use("/candidates", require("./candidate"));
router.use("/profile", require("./profile"));
router.use("/interviews", require("./interview"));
router.use("/events", require("./event"));
router.use("/evaluations", require("./evaluations"));
router.use("/interviewers", require("./interviewers"));
router.use("/report", require("./report"));
router.use("/screening", require("./screening"));
router.use("/dashboard", require("./dashboard"));

// generic catch others, not implemented
router.get("/*", (req, res) => {

  res.status(404)
    .json(new CommonError(404));
});

module.exports = router;
