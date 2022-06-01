const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const token = req.cookie.jwt
    if(token){
        jwt.verify(token, "it's a secret to everyone", (err, decodedToken) =>{
            if(err){
                res.redirect('/login')
            }else{
                next()
            }
        })
    }
    else{
        res.redirect('/login')
    }
}
module.exports = {requireAuth}