const express = require("express");
const userLogin = require("../controllers/authUser");

const router = express.Router();

router.post("/", userLogin.userLogin);

module.exports = router;
