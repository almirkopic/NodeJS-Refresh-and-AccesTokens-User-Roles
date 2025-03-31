const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const dataPath = path.join(__dirname, "..", "model", "users.json");

const ROLES_LIST = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

const getAllUsers = async (req, res) => {
  const users = usersDB.users.map((user) => ({
    username: user.username,
    roles: Object.keys(user.roles),
  }));
  res.json(users);
};

const updateUserRoles = async (req, res) => {
  const { username } = req.params;
  const { roles } = req.body;

  if (!roles || !Array.isArray(roles))
    return res.status(400).json({ message: "Valid roles array required" });

  const invalidRoles = roles.filter((role) => !ROLES_LIST[role]);
  if (invalidRoles.length)
    return res.status(400).json({ message: `Invalid roles: ${invalidRoles}` });

  const user = usersDB.users.find((u) => u.username === username);
  if (!user) return res.sendStatus(404);

  const newRoles = {};
  roles.forEach((role) => (newRoles[role] = ROLES_LIST[role]));

  user.roles = newRoles;
  const otherUsers = usersDB.users.filter((u) => u.username !== username);
  usersDB.setUsers([...otherUsers, user]);

  await fsPromises.writeFile(dataPath, JSON.stringify(usersDB.users));

  res.json({
    username: user.username,
    roles: Object.keys(user.roles),
  });
};

module.exports = { getAllUsers, updateUserRoles };
