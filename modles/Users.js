const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
   email: {
       type: String,
       required:[ true, 'please enter your email'],
       unique: true,
       lowercase: true,
       validate: [isEmail, 'please enter a valid email']
   },
   password: {
    type: String,
    required: [true, 'please enter your pass word'],
    minLength: [6, 'minimum password length is 6 characters']
   }
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model('user', userSchema)
module.exports =  User