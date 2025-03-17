const express = require("express");
const refreshTokenController = require("../controllers/refreshToken");

const router = express.Router();

router.get("/", refreshTokenController.controlRefreshToken);

module.exports = router;
