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
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const duplicate = usersDB.users.find((item) => item.username === user);

  if (duplicate) {
    return res.status(409).json({ message: "User already exist." });
  }

  try {
    const hashedPassword = await bcrypt.hash(pw, 12);

    const newUser = { username: user, password: hashedPassword };

    usersDB.setUsers([...usersDB.users, newUser]);

    await fsPromises.writeFile(dataPath, JSON.stringify(usersDB.users));

    console.log(usersDB.users);

    res.status(201).json({ sucess: "New user added." });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = { addNewUser };
