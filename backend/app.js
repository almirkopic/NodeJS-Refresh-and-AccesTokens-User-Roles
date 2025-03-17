const dataRoutes = require("./routes/api/userData");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const registerUser = require("./routes/userRegister");
const authUser = require("./routes/userLogin");
const verificationJWT = require("./middleware/JWTverification");
const refreshToken = require("./routes/refreshToken");
const logoutUser = require("./routes/userLogout");

const PORT = process.env.URI || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/register", registerUser);
app.use("/auth", authUser);
app.use("/refresh", refreshToken);
app.use("/logout", logoutUser);

app.use(verificationJWT);
app.use(dataRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
