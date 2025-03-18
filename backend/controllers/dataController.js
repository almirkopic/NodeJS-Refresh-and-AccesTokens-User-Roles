const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const dataPath = path.join(__dirname, "..", "model", "data.json");

const getAllData = async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const parsedData = JSON.parse(data || "{}");

    const sortedArray = Object.entries(parsedData).map(([id, post]) => ({
      id,
      ...post,
    }));

    return res.status(200).json(sortedArray);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching data." });
  }
};

const getSinglePost = async (req, res) => {
  const postId = req.params.postId;

  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const parseData = JSON.parse(data || "{}");

    if (!parseData[postId]) {
      return res.status(404).json({ message: "No post found." });
    }

    return res.status(200).json(parseData[postId]);
  } catch (err) {
    return res.status(500).json({ message: "Error reading single post." });
  }
};

const postData = async (req, res) => {
  const postId = uuidv4();
  const newData = req.body;

  // Validacija podataka
  if (!newData || Object.keys(newData).length === 0) {
    return res.status(400).json({ message: "Invalid data." });
  }

  try {
    const data = await fs.readFile(dataPath, "utf-8");
    let currentData = data ? JSON.parse(data) : {};

    currentData[postId] = newData;

    await fs.writeFile(dataPath, JSON.stringify(currentData, null, 2));

    return res.status(201).json({ message: "New data added.", id: postId });
  } catch (err) {
    return res.status(500).json({ message: "Error posting data." });
  }
};

const editData = async (req, res) => {
  const postId = req.params.postId;
  const newData = req.body;

  if (!newData || Object.keys(newData).length === 0) {
    return res.status(400).json({ message: "Invalid update data." });
  }

  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const parseData = JSON.parse(data || "{}");

    if (!parseData[postId]) {
      return res.status(404).json({ message: "No post found." });
    }

    parseData[postId] = { ...parseData[postId], ...newData };

    await fs.writeFile(dataPath, JSON.stringify(parseData, null, 2));
    return res.status(200).json(parseData[postId]);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "No data found by specific ID." });
  }
};

const deleteData = async (req, res) => {
  const postId = req.params.postId;

  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const parseData = JSON.parse(data || "{}");

    if (!parseData[postId]) {
      return res.status(404).json({ message: "No post found." });
    }

    delete parseData[postId];
    await fs.writeFile(dataPath, JSON.stringify(parseData, null, 2));

    return res.status(200).json({ message: "Item successfully deleted." });
  } catch (err) {
    return res.status(500).json({ message: "Error while deleting file." });
  }
};

module.exports = {
  getAllData,
  getSinglePost,
  postData,
  editData,
  deleteData,
};
