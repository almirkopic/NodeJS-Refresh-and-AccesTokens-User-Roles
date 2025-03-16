const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");
const dataPath = path.join(__dirname, "..", "model", "users.json");

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
    //jwt
    const accessToken = jwt.sign(
      { username: userFound.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5min" }
    );

    const refreshToken = jwt.sign(
      { username: userFound.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const otherUsers = usersDB.users.filter(
      (client) => client.username !== userFound.username
    );
    const currentUser = { ...userFound, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);

    await fsPromises.writeFile(dataPath, JSON.stringify(usersDB.users));

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } else {
    return res.status(401).json({ message: "Authorization failed." });
  }
};

module.exports = { loginUser };
