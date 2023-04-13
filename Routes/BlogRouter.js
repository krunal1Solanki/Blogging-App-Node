const express = require('express');
const { createBlog, readBlog, readAllBlogs, editBlog, deleteBlog, readFollowingBlogs} = require('../Controllers/BlogController');
const { isAuth } = require('../Middlewares/isAuth');
const { AccessTimeLimit } = require('../Utils/AccessTimeLimiter');

const BlogRouter = express.Router();


BlogRouter.route('/create-blog').post(isAuth, createBlog);
BlogRouter.route('/read-my-blog').get(isAuth, readBlog)
BlogRouter.route('/read-all-blog').get(readAllBlogs)
BlogRouter.route('/edit-blog').get(isAuth, AccessTimeLimit, editBlog)
BlogRouter.route('/delete-blog').delete(isAuth, deleteBlog)
BlogRouter.route('/read-following-blog').get(isAuth, readFollowingBlogs)


module.exports = BlogRouter;
