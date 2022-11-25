const ErrorHandler = require("../utils/errorHandler")

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.messsage = err.messsage || "Internal Server Error"


    //wrong mongodb id error
    if(err.name == "CastError"){
        const message = `Resource not Found. Invalid:${err.path}`
        err = new ErrorHandler(message, 400)
    }

    //mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400)
    }

    //json web token error
    if(err.name === 'jsonWebTokenError'){
        const message = `JSON WEB TOKEN is Invalid. Try Again.`;
        err = new ErrorHandler(message, 400)
    }

    //jwt expire error
    if(err.name === 'tokenExpireError'){
        const message = `JSON WEB TOKEN is Expired. Try Again.`;
        err = new ErrorHandler(message, 400)
    }



    res.status(err.statusCode).json({
        success:false,
        message: err.message,
    })
}