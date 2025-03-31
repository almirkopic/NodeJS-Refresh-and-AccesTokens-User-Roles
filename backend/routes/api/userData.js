const ROLES_LIST = {
  Admin: 5150,
  Editor: 1984,
  User: 2001,
};

const express = require("express");

const dataController = require("../../controllers/dataController");

const rolesVerification = require("../../middleware/rolesVerification");

const router = express.Router();

router.get(
  "/posts",
  rolesVerification(ROLES_LIST.User, ROLES_LIST.Admin, ROLES_LIST.Editor),
  dataController.getAllData
);

router.get(
  "/posts/:postId",
  rolesVerification(ROLES_LIST.User, ROLES_LIST.Admin, ROLES_LIST.Editor),
  dataController.getSinglePost
);

router.post(
  "/posts",
  rolesVerification(ROLES_LIST.Admin, ROLES_LIST.Editor),
  dataController.postData
);

router.put(
  "/posts/:postId",
  rolesVerification(ROLES_LIST.Admin, ROLES_LIST.Editor),
  dataController.editData
);

router.delete(
  "/posts/:postId",
  rolesVerification(ROLES_LIST.Admin),
  dataController.deleteData
);

module.exports = router;
