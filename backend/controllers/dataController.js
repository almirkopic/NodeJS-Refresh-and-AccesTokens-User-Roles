const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, "..", "model", "data.json");

// const data = {};

const getAllData = async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const parsedData = JSON.parse(data);

    const sortedArray = Object.entries(parsedData).map(([id, post]) => ({
      id,
      ...post,
    }));

    res.status(200).json(sortedArray);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
};

const postData = async (req, res) => {
  const postId = new Date().toISOString();
  const newData = req.body;

  try {
    const data = await fs.readFile(dataPath, "utf-8");
    let currentData = data ? JSON.parse(data) : {};

    currentData[postId] = newData;

    const jsonData = JSON.stringify(currentData);

    await fs.writeFile(dataPath, jsonData);

    return res.status(201).json({ mesage: "New data added." });
  } catch (err) {
    return res.status(500).json({ message: "Error posting data." });
  }
};

const editData = async (req, res) => {
  const postId = req.params.postId;
  const newData = req.body;

  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const parseData = JSON.parse(data);

    if (parseData[postId]) {
      parseData[postId] = newData;

      await fs.writeFile(dataPath, JSON.stringify(parseData));
      return res.status(200).json(parseData[postId]);
    } else {
      return res.status(404).json({ message: "No post found." });
    }
  } catch (err) {
    console.error("Error:", err); // Loguj greške
    res.status(500).json({ message: "No data found by specific ID." });
  }
};

const deleteData = async (req, res) => {
  const postId = req.params.postId;

  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const parseData = JSON.parse(data);

    if (parseData[postId]) {
      delete parseData[postId];
      await fs.writeFile(dataPath, JSON.stringify(parseData));
      return res.status(201).json({ message: "Item sucesfully deleted." });
    } else {
      return res
        .status(500)
        .json({ message: "Cant delete item, please try again later" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error while deleting file." });
  }
};

module.exports = {
  getAllData,
  postData,
  editData,
  deleteData,
};
