const userSchema = require('../Schema/User.js')
const bcrypt = require('bcrypt');
const validator = require('validator');

const User = class {
    username;
    email;
    password;
    mobile;
    constructor({ username, password, email, mobile }) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.mobile = mobile;
    }

    static verifyUsernameAndEmail({ email, username }) {
        return new Promise(async (resolve, reject) => {
            let dummyUser;
            try {
                dummyUser = await userSchema.findOne({
                    $or: [
                        { email: email },
                        { username: username }
                    ]
                });
            } catch (error) {
                reject('database error')
            }
            if (dummyUser) reject('User already exists with that username');
            else resolve();
        })
    }

    static registerUser = async (user) => {
        const hashPass = await bcrypt.hash(user.password, 12);
        return new Promise(async (resolve, reject) => {
            try {
                const newUser = new userSchema({
                    username : user.username ,
                    password: hashPass,
                    email : user.email,
                    mobile : user.mobile,
                })
                await newUser.save()
                resolve();
            }
            catch (error) {
                reject('database error');
            }
        })
    }


    static loginUserFun = async ({name, password, req}) => { 
        return new Promise( async (resolve, reject) => {
            let user;
            try {
                if(validator.isEmail(name)) {
                    user = await userSchema.findOne({email : name});
                } else {
                    user = await userSchema.findOne({username : name});
                }
            } catch (error) {
                reject('database error')
            }
        
            if(!user) {
                reject('No user exists, please register first !')
            }
        
            try {
                let result = await bcrypt.compare(password, user.password);
                req.session.isAuth = true;
                req.session.user = {
                    name : user.email,
                    id : user._id
                }
                if(result) resolve();
            } catch(error) {
                reject('database error')
            }
        })
    }
}

module.exports = User