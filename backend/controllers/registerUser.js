const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const dataPath = path.join(__dirname, "..", "model", "users.json");

const addNewUser = async (req, res) => {
  const { user, pw } = req.body;

  if (!user || !pw)
    return res.status(400).json("Username and password are required.");

  const duplicate = usersDB.users.find((client) => client.username === user);

  if (duplicate) {
    return res.sendStatus(409);
  }

  try {
    const hashedPassword = await bcrypt.hash(pw, 12);
    const newUser = {
      username: user,
      roles: { User: 2001 },
      password: hashedPassword,
    };

    usersDB.setUsers([...usersDB.users, newUser]);

    await fsPromises.writeFile(dataPath, JSON.stringify(usersDB.users));
    res.status(201).json({ message: "New user created." });
  } catch (err) {
    return res.status(500).json({ message: "Error creating new user." });
  }
};

module.exports = { addNewUser };
