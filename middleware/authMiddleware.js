const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, "it's a secret to everyone", (err, decodedToken) =>{
            if(err){
                console.log(err.message)
                res.redirect('/login')
            }else{
                console.log(decodedToken)
                next()
            }
        })
    }
    else{
        res.redirect('/login')
    }
}
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, "it's a secret to everyone", (err, decodedToken) =>{
            if(err){
                console.log(err.message)
                next()
            }else{
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    }
    else{
        res.locals.user = null
        next()
    }
}

module.exports = {requireAuth, checkUser}