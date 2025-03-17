const express = require("express");
const userLogout = require("../controllers/logoutUser");

const router = express.Router();

router.get("/", userLogout.controlLogout);

module.exports = router;
