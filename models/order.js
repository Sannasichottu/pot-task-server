import mongoose from "mongoose";
const { Schema } = mongoose;
const {ObjectId} = mongoose.Schema;

const productCartSchema = new Schema ({
    product : {
        type:ObjectId,
        ref:"Product"
    },
    name :String,
    count : Number,
    price: Number

})


module.exports = mongoose.model("ProductCart", productCartSchema)

const OrderSchema = new Schema ({
    products:[ProductCart],
    transactionId : {},
    amount:Number,
    address: String,
    user:{
        type:ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model("Order", OrderSchema);
