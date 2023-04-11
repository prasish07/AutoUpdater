const express = require("express");

const app = express();
const connect = require("./DbConnect/Db");
require("dotenv").config();
const router = require("./routes/userRoute");

app.use(express.json());

const port = 5000 || process.env.PORT;
app.use("/api/v1", router);

const start = async () => {
  try {
    await connect(process.env.MONGO_URL);
  } catch (error) {
    console.log("Connection failed");
  }
  app.listen(port, () => {
    console.log("App is listening in port 5000");
  });
};

start();
