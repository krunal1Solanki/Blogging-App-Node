const { readBlogDB } = require("../Models/BlogModel");
const BlogModel = require("../Models/BlogModel");
const Blog = require("../Schema/Blog");
const { blogValidator } = require("../Utils/BlogValidator");

exports.createBlog = (async (req, res) => {
    const { content, title } = req.body;
    try {
        await blogValidator(content, title);
    } catch (error) {
        return res.status(400).send({
            message: 'error occured',
            error: error
        })
    }

    const userId = req.session.user.id;

    try {
        await BlogModel.saveBlog({ content, title, userId });
        return res.send({
            message: 'blog created successfully'
        })
    } catch (error) {
        return res.send({
            message: "error occured creating blog",
            error: error
        })
    }
})


exports.readBlog = (async (req, res) => {
    const skip = Number(req.query.skip) || 0;
    let data;
    try {
        data = await BlogModel.readBlogDB(req.session.user.id, skip);
        return res.send({
            message: "successfully retreived",
            info: data
        })
    } catch (error) {
        return res.send({
            message: 'eror occured',
            error: error
        })
    }
})
exports.readAllBlogs = (async (req, res) => {
    const skip = Number(req.query.skip) || 0;
    let data;
    try {
        data = await BlogModel.readAllBLogsDb(skip);
        return res.send({
            message: "successfully retreived",
            info: data
        })
    } catch (error) {
        return res.send({
            message: 'eror occured',
            error: error
        })
    }
})



exports.editBlog = (async (req, res) => {
    const { content, title, id } = req.body;

    try {
        await blogValidator(content, title);
    } catch (error) {
        return res.status(400).send({
            message: 'validation error',
            error: error
        })
    }

    try {
        await BlogModel.editBlogDB({ content, title, id });
        return res.send({
            message: 'blog updated successfully'
        })
    } catch (error) {
        return res.send({
            message: 'database error',
            error: error
        })
    }
})

exports.deleteBlog = ((req, res) => {
    const id = req.query.id;

    try {
        BlogModel.deleteBlogDB(id);
        return res.status(200).send({
            message: "Blog deleted successfully"
        })
    } catch (error) {
        return res.status(200).send({
            message: "delete unsuccessful",
            error: error
        })
    }
})

exports.readFollowingBlogs = (async(req, res) => {
    const id = req.query.id;
    try {
        const blogs = await BlogModel.readFollowingBlogsDB(id);
        return res.send({
            message : 'Successful retrieval',
            data : blogs
        })
    } catch (error) {
        return res.send({
            message : 'Error occured',
            error : error.message
        })
    }
})