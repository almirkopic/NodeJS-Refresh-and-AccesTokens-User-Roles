const express = require("express");

const dataController = require("../../controllers/dataController");

const router = express.Router();

router.get("/posts", dataController.getAllData);

router.get("/posts/:postId", dataController.getSinglePost);

router.post("/posts", dataController.postData);

router.put("/posts/:postId", dataController.editData);

router.delete("/posts/:postId", dataController.deleteData);

module.exports = router;
