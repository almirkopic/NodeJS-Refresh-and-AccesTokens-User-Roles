const jwt = require("jsonwebtoken");
require("dotenv").config();

const verificationJWT = (req, res, next) => {
  const headers = req.headers["authorization"];

  if (!headers) return res.sendStatus(401);

  const token = headers.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded.username;
    next();
  });
};

module.exports = verificationJWT;
