const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const { user, pw } = req.body;

  if (!user || !pw) {
    return res
      .status(400)
      .json({ message: "Both username and password are required." });
  }

  const userFound = usersDB.users.find((item) => item.username === user);

  if (!userFound) return res.status(401).json({ message: "User not found." });

  const match = await bcrypt.compare(pw, userFound.password);

  if (match) {
    return res.status(201).json({ message: "Successfully authorized." });
  } else {
    return res.status(401).json({ message: "Authorization failed." });
  }
};

module.exports = { loginUser };
