const express = require("express");

const router = express.Router();

router.get("/posts", (req, res) => {
  console.log("Get");
});

router.post("/posts", (req, res) => {
  console.log("Post");
});

router.put("/posts/:postId", (req, res) => {
  console.log("Put");
});

router.delete("/posts/:postId", (req, res) => {
  console.log("Delete");
});

module.exports = router;
