const mongoose=require("mongoose");
const shortid = require("shortid");

const OrderSchema=mongoose.Schema({
    _id:{
        type:String,
        required:true,
        default:shortid.generate,
    },
    o_customer_name:{
        type:String,
        required:true,
    },
    o_customer_email:{
        type:String,
        required:true,
    },
    o_shipping_addr:{
        type:String,
        required:true,
    },
    o_total:{
        type:Number,
        required:true,
    },
    o_payment_method:{
    type:String,
    required:true
    },
    o_cartItems:[],
},{
    timestamps:true
});

module.exports=mongoose.model("Orders",OrderSchema);