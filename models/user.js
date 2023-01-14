const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    name : {
        type:String,
        required: true,
        minlength:3,
        trim:true
    },
    lastname : {
        type:String,
        required: true,
        minlength:1,
        trim:true
    },
    email : {
        type:String,
        required: true,
        unique: true,
        trim:true
    },
    password : {
        type : String,
        required : true,
        minlength:5
    },
    role : {
        type :Number,
        default:0
    },
    purchases : {
        type : Array,
        default:[]
    },
});

userSchema.methods.authenticate = function(userSigninPass) {
    return userSigninPass === this.password
}

module.exports = mongoose.model("User", userSchema)
