const User = require('../Models/User');
const { validateUser } = require('../Utils/Validator');

exports.registerUser =  (async (req, res) => {
    const { username, password, email, mobile } = req.body;
    try {
        await validateUser({ username, password, email, mobile });
    } catch (error) {
        return res.status(400).send({
            message: 'validation error',
            error: error,
        });
    }


    try {
        await User.verifyUsernameAndEmail({username, email});
    } catch(error) {
        return res.send({
            message : error,
        })
    }

    try {
        await User.registerUser({ username, password , email, mobile });
        return res.status(200).send({
            message : "User created successfully",
        })
    } catch(error) {
        return res.status(500).send({        
            message : "database error",
            error : error,
        })
    }
});

exports.loginUser = (async (req, res) => {
    const {name, password} = req.body;
    try {
        const info = await User.loginUserFun({name, password, req});
        return res.send({
            message : 'login successful'
        })
    } catch(error) {
        return res.send({
            message : 'error occured',
            error : error
        })
    }
})


exports.home = (req, res) => {
    return  res.send({
        message : 'this is home'
    })
}


exports.logoutUser = (req, res) => {
    try {
        req.session.destroy();
        return res.send({
            message : "logged out successfully"
        })
    } catch(error) {
        return res.status(400).send({
            message : 'logout error',
            error : error 
        })
    }
} 
