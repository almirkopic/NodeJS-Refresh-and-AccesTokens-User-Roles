const dataRoutes = require("./routes/api/data");
const express = require("express");
const app = express();

const PORT = process.env.URI || 3000;

app.use(dataRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
