const express = require('express');
const { registerUser, loginUser, home, logoutUser} = require('../Controllers/UserController');
const { isAuth } = require('../Middlewares/isAuth');
const Router = express.Router();


Router.route('/').get(home)
Router.route('/register').post(registerUser);
Router.route('/login').post(loginUser);
Router.route('/logout').get(isAuth ,logoutUser);
module.exports = {Router}