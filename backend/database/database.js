const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDB Connected with server : ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
