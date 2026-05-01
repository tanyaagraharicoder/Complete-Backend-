//  in this file we will write all the routes related to authentication like login, register, logout etc


const express = require('express');

const authController = require('../controllers/auth.controller'); // Import the auth controller for handling authentication logic

const router = express.Router();




/* POST/api/auth/register */
router.post('/register',  authController.registerUser); 








module.exports = router;