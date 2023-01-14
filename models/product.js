const mongoose = require('mongoose')
const { Schema } = mongoose;

const productSchema = new Schema ({
    name: {
        type:String,
        minlength:3,
        required:true
    },
    description:{
        type:String,
        minlength:15
    },
    price : {
        type:Number,
        required:true
    },
    stock : {
        type:Number,
    },
    sold : {
        type : Number,
        default : 0
    },
    photo : {
        type : Buffer,
        contentType:String
    }
})

module.exports = mongoose.model("Product",productSchema);