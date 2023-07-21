const express = require("express");
const bodyParser = require("body-parser");
const playlistRoutes = require("./routes/playlistRoutes");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use("/playlist", playlistRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
