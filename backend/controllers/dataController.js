const data = {};

const getAllData = (req, res) => {
  const sortedArray = Object.entries(data).map(([id, post]) => ({
    id,
    ...post,
  }));

  res.status(201).send(sortedArray);
};

const postData = (req, res) => {
  const postId = new Date().toISOString();
  const newData = req.body;

  data[postId] = newData;

  res.status(201).json(data);
};

const editData = (req, res) => {
  const postId = req.params.postId;
  const newData = req.body;

  if (data[postId]) {
    data[postId] = newData;
    res.status(200).json(data);
  }
  console.log(post);
};

const deleteData = (req, res) => {
  const postId = req.params.postId;

  if (data[postId]) {
    delete data[postId];
    res
      .status(200)
      .json({ message: `Post with ID ${postId} deleted successfully.` });
  } else {
    res.status(404).json({ message: `Post with ID ${postId} not found.` });
  }
};

module.exports = {
  getAllData,
  postData,
  editData,
  deleteData,
};
