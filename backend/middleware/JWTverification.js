const jwt = require("jsonwebtoken");
require("dotenv").config();

const verificationJWT = (req, res, next) => {
  const headers = req.headers.authorization || req.headers.Authorization;

  if (!headers?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = headers.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verificationJWT;
