const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {
        type : String, 
        required : true,
    },
    content: {
        type: String,
        required: true,
        maxLength : 1000,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model("blog", blogSchema);
