const blogSchema = require('../Schema/Blog');
const { ObjectId } = require('mongodb');
const Constants = require('../Utils/Constants');
const Fandom = require('../Schema/Fandom');
const BlogModel = class {

    // SAVE BLOG
    static saveBlog = async ({ content, userId, title }) => {
        try {
            const blog = new blogSchema({
                content: content,
                userId: userId,
                title: title
            })
            await blog.save();
        } catch (error) {
            throw new Error('Error occurred saving blog');
        }
    }


    // READ BLOG
    static readBlogDB = async (id, skip) => {
        try {
            const objectId = new ObjectId(id);
            const blogs = await blogSchema.aggregate([
                { $match: { userId: objectId } },
                { $sort: { createdAt: -1 } },
                {
                    $facet: {
                        data: [
                            { $skip: skip },
                            { $limit: Constants.BLOGLIMIT }
                        ]
                    }
                }
            ])

            return blogs[0].data;

        } catch (error) {
            throw error;
        }
    }


    //READ ALL BLOGS
    static readAllBLogsDb = async (skip) => {
        try {
            const blogs = await blogSchema.aggregate([
                { $sort: { createdAt: -1 } },
                {
                    $facet: {
                        data: [
                            { $skip: skip },
                            { $limit: Constants.BLOGLIMIT }
                        ]
                    }
                }
            ])

            return blogs[0].data;

        } catch (error) {
            throw error;
        }
    }

    // EDIT BLOG
    static editBlogDB = async ({ title, content, id }) => {
        try {
            await blogSchema.findByIdAndUpdate(id, { title: title, content: content });
        } catch (error) {
            throw error;
        }
    }

    //DELETE BLOG
    static deleteBlogDB = async (id) => {
        try {
            await blogSchema.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    static readFollowingBlogsDB = async (followerId) => {
        let followingIds;
        try {
            const fandoms = await Fandom.find({ follower_id: followerId });
            followingIds = fandoms.map(fandom => fandom.following_id);
            
        } catch (error) {
            throw error;
        }

        let blogs;
        try {
            blogs = await blogSchema.find({ userId: { $in: followingIds } });
            return blogs;
        } catch (error) {
            throw error;
        }
    }

}



module.exports = BlogModel
