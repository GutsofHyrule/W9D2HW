const User = require('../modles/Users')
const jwt = require('jsonwebtoken')

const handleError= (err) =>{
    console.log(err.message, err.code);
    let errors =  {email: '', password:''}

    if(errors.code === 11000){
        errors.email = 'that email is in use'
    }


    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] =  properties.message
        })
    }
    return errors
}

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, "it's a secret to everyone", {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req,res) => {
    res.render('signup');
}
module.exports.login_get = (req,res) => {
    res.render('login');
}
module.exports.signup_post = async(req,res) => {
    const {email, password} = req.body;
    try{
       const user = await User.create({email, password})
       const token = createToken(user_id)
       res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
       res.status(201).json(user)
    }
     catch(err){
        const errors = handleError(err)
        res.status(400).json({errors})
     }
}
module.exports.login_post = async(req,res) => {
    const {email, password} = req.body;
    console.log(email, password);
    res.send('login'); 
}
