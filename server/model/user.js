const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_I = 10

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
    },
    token: {
        type: String
    }
})

userSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I, function(err, salt){
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);

                user.password = hash
                next();
            })
        })
    }else{
        next();
    }
})



userSchema.methods.comparePassword = function(candidatePassword, cb){
    // console.log(this)
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) throw err;

        cb(null, isMatch)
    })
}

userSchema.methods.generateTokens = function(cb){
    // console.log('user')
    var user = this;
    // console.log(this)
    var token = jwt.sign(user._id.toHexString(), '123')

    user.token = token;

    user.save(function(err, user){
        if(err) return cb(err)

        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    const user = this

    jwt.verify(token, '123',function(err, decode){
        user.findOne({"_id": decode, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = {User}