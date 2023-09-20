const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const CandidateController = require("../controllers/CandidateController");
// const UserRoleController = require("../controllers/UserRoleController");

//console.log("In Candidate Route");

const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "cv/");
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + file.originalname);
      },
    }),
  }).single("cv");
  
router.get("/", (req, res) => {
    CandidateController.getAllCandidates(req, res);
});

router.get("/:id", (req, res) => {
    CandidateController.getCandidateById(req, res);
});

router.post("/createCandidate",upload,(req, res)=> {
    console.log("reqauest",req)
    CandidateController.createCandidate(req, res);
});

router.delete("/deleteCandidate/:id", (req, res) => {
    CandidateController.deleteCandidate(req, res);
});

router.put("/updateCandidate/:id", upload,(req, res) => {
    CandidateController.updateCandidate(req, res);
});

module.exports = router;
