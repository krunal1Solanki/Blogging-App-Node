const FandomModel = require("../Models/FandomModel");

exports.followController = async (req, res) => {
    const { follower_id, following_id } = req.body;
    try {
        let result = await FandomModel.checkAlreadyFollow({follower_id, following_id});
        if(result) throw new Error('Already Following')
        const followerExists = await FandomModel.findUserExists(follower_id);

        if (!followerExists) throw new Error('follower does not exists');

        const followingExists = await FandomModel.findUserExists(following_id);
        if (!followingExists) throw new Error('Person you trying to follow does not exists');


        await FandomModel.follow({ follower_id, following_id });
        return res.status(200).send({
            message: 'followed successfully',
        })
    } catch (error) {
        return res.status(400).send({
            message: 'error occurred',
            error: error.message
        })
    }
}


exports.unfollowController = async (req, res) => {
    const { follower_id, following_id } = req.body;
    try {
        let result = await FandomModel.checkAlreadyFollow({follower_id, following_id});
        if(!result) throw new Error('User cannot unfollow, already not following')
        
        const followerExists = await FandomModel.findUserExists(follower_id);
        if (!followerExists) throw new Error('follower does not exists');

        const followingExists = await FandomModel.findUserExists(following_id);
        if (!followingExists) throw new Error('Person you trying to follow does not exists');


        await FandomModel.unfollow({ follower_id, following_id });
        return res.status(200).send({
            message: 'unfollowed successfully',
        })
    } catch (error) {
        return res.status(400).send({
            message: 'error occurred',
            error: error.message
        })
    }
}

