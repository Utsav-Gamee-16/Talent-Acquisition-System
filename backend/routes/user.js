const express = require("express");

const router = express.Router();
const UserController = require("../controllers/UserController");
// const UserRoleController = require("../controllers/UserRoleController");

console.log("In User Route");

router.post("/login", (req, res) => {
  UserController.userLogin(req, res, false);
});

router.get("/", (req, res) => {
  UserController.getAllUsers(req, res);
});

router.get("/:id", (req, res) => {
  UserController.getUserById(req, res);
});

router.post("/createUser", (req, res)=> {
  UserController.createUser(req, res);
});

router.delete("/deleteUser/:id", (req, res) => {
    UserController.deleteUser(req, res);
});

router.put("/updateUser/:id", (req, res) => {
  UserController.updateUser(req, res);
});

module.exports = router;
