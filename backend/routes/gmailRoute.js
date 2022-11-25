const express = require('express')
const router = express.Router();
const { setSignature,logoutGsuite, getAllUsers } =  require("../controllers/gmailController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route('/users').get( isAuthenticatedUser ,getAllUsers);
router.route('/updateSignature').get( isAuthenticatedUser ,setSignature);
router.route('/logout').get( isAuthenticatedUser ,logoutGsuite);








module.exports = router;