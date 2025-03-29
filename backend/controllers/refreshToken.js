const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;

const controlRefreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies || !cookies.jwt) return res.sendStatus(401);

  const refreshToken = req.cookies?.jwt;
  if (!refreshToken) return res.sendStatus(401);

  const userFound = usersDB.users.find(
    (client) => client.refreshToken === refreshToken
  );

  if (!userFound) return res.sendStatus(403);

  jwt.verify(refreshToken, REFRESH_TOKEN, (err, decoded) => {
    if (err || userFound.username !== decoded.username) {
      return res.sendStatus(403);
    }
    const roles = Object.values(userFound.roles);

    const accessToken = jwt.sign(
      { UserInfo: { username: decoded.username, roles: roles } },
      ACCESS_TOKEN,
      {
        expiresIn: "7min",
      }
    );
    res.json({ accessToken, roles });
  });
};

module.exports = { controlRefreshToken };
