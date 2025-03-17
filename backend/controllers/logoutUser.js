const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, "..", "model", "users.json");

const controlLogout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies || !cookies.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  const userFound = usersDB.users.find(
    (client) => client.refreshToken === refreshToken
  );
  if (!userFound) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  const otherUsers = usersDB.users.filter(
    (client) => client.refreshToken !== userFound.refreshToken
  );
  const currentUsers = { ...userFound, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUsers]);

  try {
    await fsPromises.writeFile(dataPath, JSON.stringify(usersDB.users));
  } catch (err) {
    return res.sendStatus(500);
  }

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

module.exports = { controlLogout };
