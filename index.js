const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");
app.use(cors());

require("dotenv").config();
require("./db");
const PORT = 7001;
app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/blogs", taskRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Task manager API is working",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});
