const express = require("express");
const path = require("path");
const fsPromises = require("fs").promises; // work with async operations

const router = express.Router();
const data = {};

router.get("/posts", (req, res) => {
  const sortedArray = Object.entries(data).map(([id, post]) => ({
    id,
    ...post,
  }));

  res.status(201).send(sortedArray);
});
//POST
router.post("/posts", (req, res) => {
  const postId = new Date().toISOString();
  const newData = req.body;

  data[postId] = newData;

  res.status(201).json(data);
});

router.put("/posts/:postId", (req, res) => {
  const postId = req.params.postId;
  const newData = req.body;

  if (data[postId]) {
    data[postId] = newData;
    res.status(200).json(data);
  }

  console.log(post);
});

router.delete("/posts/:postId", (req, res) => {
  const postId = req.params.postId;

  if (data[postId]) {
    delete data[postId];
    res
      .status(200)
      .json({ message: `Post with ID ${postId} deleted successfully.` });
  } else {
    res.status(404).json({ message: `Post with ID ${postId} not found.` });
  }
});

module.exports = router;
