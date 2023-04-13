const isAuth = (req, res, next) => {
    if(req.session.isAuth) {
        return next();
    } 
    return res.send({
        message : 'please login first',
        status : 400
    })
}

module.exports = {isAuth}