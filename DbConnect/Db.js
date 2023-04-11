const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url);
  console.log("DB connected");
};

module.exports = connectDB;
