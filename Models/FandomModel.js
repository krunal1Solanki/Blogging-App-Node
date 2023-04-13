const Fandom = require("../Schema/Fandom")
const User = require("../Schema/User");

const FandomModel = class {
    static findUserExists = async (id) => {
        try {
            const user = await User.findOne({_id : id})     
            if(!user) throw new Error('user does not exists')
            return user;
        } catch (error) {
                throw error
            }
        }

    static follow = async ({follower_id, following_id}) => {
        try {
            const fandom = new Fandom({
                following_id : following_id,
                follower_id : follower_id
            })
            fandom.save();
        } catch (error) {
            throw error
        }
    }
     

    static unfollow = async ({follower_id, following_id}) => {
        try {
            const result = await Fandom.findOneAndDelete({
                $and: [
                  { follower_id: follower_id },
                  { following_id: following_id }
                ]
              });
        } catch (error) {
            throw error;
        }
    }


    
    static checkAlreadyFollow = async ({follower_id, following_id}) => {
        try {
            const result = await Fandom.findOne({
                $and: [
                  { follower_id: follower_id },
                  { following_id: following_id }
                ]
              });
            
              return result
        } catch (error) {
            throw error;
        }
    }
}


module.exports = FandomModel