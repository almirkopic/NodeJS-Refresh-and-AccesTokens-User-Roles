const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fsPromise = require("fs").promises;

const dataPath = path.join(__dirname, "..", "model", "users.json");

const userLogin = async (req, res) => {
  const { user, pw } = req.body;
  if (!user || !pw) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }
  const userFound = usersDB.users.find((client) => client.username === user);

  if (!userFound) {
    return res.status(401).json({ message: "User not found." });
  }

  const match = await bcrypt.compare(pw, userFound.password);

  if (match) {
    const accessToken = jwt.sign(
      { username: userFound.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7min" }
    );

    const refreshToken = jwt.sign(
      { username: userFound.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //save refreshToken
    const otherUsers = usersDB.users.filter(
      (client) => client.username !== userFound.username
    );
    const currentUser = { ...userFound, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromise.writeFile(dataPath, JSON.stringify(usersDB.users));

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      // sameSite: "None",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  } else {
    return res.status(401).json({ message: "Error authorizing user." });
  }
};

module.exports = { userLogin };
