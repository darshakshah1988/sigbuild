const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    maxLength: [30, "Cannot Exceed 30 Characters"],
    minLength: [5, "Name should have more than 5 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
    minLength: [8, "Password should have equal to or more than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      default: '',
      required: false,
    },
    url: {
      type: String,
      default: '',
      required: false,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token
userSchema.methods.getJWTToken = function () {
  return JWT.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}

//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function (){

  //Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and adding reset passowrd token to User Schema
  this.resetPasswordToken = crypto.
  createHash("sha256").update(resetToken).digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
}



module.exports = mongoose.model("user", userSchema);
