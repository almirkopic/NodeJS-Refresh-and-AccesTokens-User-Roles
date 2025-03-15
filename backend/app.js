const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const dataRoutes = require("./routes/api/userData");
const registerRoute = require("./routes/userRegister");
const loginUser = require("./routes/userAuth");

const PORT = process.env.URI || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(dataRoutes);
app.use("/register", registerRoute);
app.use("/auth", loginUser);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
