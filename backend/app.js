const dataRoutes = require("./routes/api/userData");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const registerRoute = require("./routes/userRegister");

const PORT = process.env.URI || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(dataRoutes);
app.use("/register", registerRoute);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
