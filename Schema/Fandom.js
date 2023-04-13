    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const fandomSchema = new Schema({
        follower_id : {
            type : String, 
            required : true
        },
        following_id : {
            type : String, 
            required : true
        },
        creation_time: {
            type : String, 
            default : Date.now(),
        },

    })

    module.exports = mongoose.model('fandom', fandomSchema);