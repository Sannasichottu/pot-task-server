const express = require('express');
const router = express.Router();
const {signup,signin,signout} = require('../controllers/auth');

//form-validation
const {body} = require('express-validator')

router.post("/signup",[
    body('email').isEmail(),
    body('password').isLength({min:5})
], signup);

router.post("/signin",[
    body('email').isEmail(),
    body('password').isLength({min:1})
],signin);
router.get("/signout",signout);

module.exports = router;