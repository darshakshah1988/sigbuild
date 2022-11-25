const express = require('express')
const router = express.Router();
const { registerUser, loginUser, logoutUser,getUserDetails,updateProfile } =  require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/update').post(isAuthenticatedUser , updateProfile);
router.route('/me').get( isAuthenticatedUser ,getUserDetails);








module.exports = router;