var User = require('../models/user');
var jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
//form-validation
const {validationResult} = require('express-validator')

exports.signup = (req,res)=> {

    //validation user
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const user = new User(req.body);

    user.save((err,user) => {
        if(err) {
            return res.status(400).json({
                error:"not able to save user to database"
            })
        }
        res.json({
            name : user.name,
            email: user.email,
            id:user._id
        })
    })
}


exports.signin = (req,res)=> {

    //validation of email and password
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body

    User.findOne({email},(err,user) => {
        if(err) {
            return res.status(400).json({
                error: "email not found"
            })
        }
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: "Invalid Password"
            })
        }

        //generate token
        const token = jwt.sign({id:user._id}, process.env.SECRET,{ algorithm: 'RS256' });

        //token into user browser via cookie parser
        res.cookie("COOKIE",token,{expire : new Date() + 99999 })

        //send data to client for testing
        const {_id, name,email,role} = user
        res.json({
            id:_id,
            email:email,
            name:name,
            role:role,
            token:token
        })
    })
}



exports.signout = (req,res)=> {
    res.clearCookie("token")
    res.json({
        msg: "User signout"
    })
}


//custome middleware
exports.isSignedIn = (req, res, next) =>{
    expressJwt({
        secret : process.env.SECRET,
        useProperty : 'auth',
        algorithm:['RS256']
    });
    next()
}


exports.isAuthenticated = (req,res,next) => {

    next()
}

exports.isAdmin = (req,res,next) => {

    next()
}