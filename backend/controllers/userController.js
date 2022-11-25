const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleWare/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");


//Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {

  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "userProfilePhotos",
  //   width: 150,
  //   crop: "scale",
  // });

    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      // avatar: {
      //   public_id: '',
      //   url: '',
      // },
    });
    sendToken(user, 201, res);
});

//LOGIN USER
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //chcecong if user has given both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }

  sendToken(user, 200, res);
});

// LOGOUT USER
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  const options = {
    httpOnly: true,
    sameSite:'None',
    secure:true,
    expires: new Date(Date.now())
  };
  res.cookie("token", null, options);

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//GET USER DETAILS -- Logged IN
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//UPDATE USER PROFILE
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserDetail = {
    name: req.body.name  ? req.body.name : undefined,
    email: req.body.email ? req.body.email: undefined
  };

  if (req.body.avatar !== '') {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    if(imageId !== ''){
      await cloudinary.v2.uploader.destroy(imageId);
    }

    if(req.body.avatar){
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "uuserProfilePhotos",
        width: 150,
        crop: "scale",
      });
  
      newUserDetail.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserDetail, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    user,
    success: true,
  });
});

