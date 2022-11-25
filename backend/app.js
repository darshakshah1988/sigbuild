const express = require("express");
const app = express();
const errorMiddleWare = require("./middleware/error");
const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

//Route Imports
const user = require("./routes/userRoute");
const gmail = require("./routes/gmailRoute");

app.use((req,res,next)=>{
    const allowedOrigins = [process.env.LOCAL_FRONTEND_URL];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
      res.header('Access-Control-Allow-Methods',"POST, PUT, GET, DELETE");
      res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
      res.header("Access-Control-Allow-Credentials",true)
      next();
    })
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}); //npm i express-fileupload cloudinary

app.use("/api/v1", user);
app.use("/api/v1/gsuite", gmail);

//MiddleWare for Error
app.use(errorMiddleWare);

module.exports = app;