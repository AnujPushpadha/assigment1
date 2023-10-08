const express = require("express");
const connectDB = require("./config/dbConnection.js");
const errorHandler = require("./middleware/errorHandler.js");
const userRoutes = require("./routes/userRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 3000;

connectDB();
app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/users", userRoutes);
app.use("/api/task", taskRoutes);
app.use(errorHandler);
app.listen(port, () => console.log(`server is running on ${port} port`));
