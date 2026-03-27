require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use("/auth", require("./routes/auth.routes"));

connectDB();

app.listen(process.env.PORT, () => {
  console.log("Server running");
});
