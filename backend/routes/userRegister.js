const express = require("express");
const registerController = require("../controllers/registerUser");

const router = express.Router();

router.post("/", registerController.addNewUser);

module.exports = router;
