const express = require('express');
const route = express.Router();

// 

const authController = require('../controller/auth');

// routes

route.post('/signup',authController.postSignUp);
route.get('/registerVerification/:registerNO',authController.verificationController);
route.post('/login',authController.loginController);
module.exports=route;