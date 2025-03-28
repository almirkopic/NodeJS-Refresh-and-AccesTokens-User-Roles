const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateUserRoles,
} = require("../controllers/adminController");
const verificationJWT = require("../middleware/JWTverification");
const verifyRoles = require("../middleware/rolesVerification");

router.route("/").get(verificationJWT, verifyRoles(5150), getAllUsers);

router
  .route("/:username")
  .put(verificationJWT, verifyRoles(5150), updateUserRoles);

module.exports = router;
