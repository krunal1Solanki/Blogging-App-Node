const express = require('express');
const {followController, unfollowController}= require('../Controllers/FandomController');
const FandomRouter = express.Router();

FandomRouter.route('/follow').post(followController);
FandomRouter.route('/unfollow').post(unfollowController);
module.exports = FandomRouter;
