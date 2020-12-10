const mongoose=require("mongoose");

const ProductSchema=mongoose.Schema({
    p_name:{
        type:String,
        required:true,
        unique:true,
    },
    p_image:{
        type:String,
        required:true,
    },
    p_category:{
        type:String,
        required:true,
    },
    p_price:{
        type:Number,
        required:true,
    },
    p_quantity:{
        type:Number,
        required:true
    },
    p_pet_type:{
        type:String,
        required:true,
    },
    p_description:{
        type:String,
    },
    p_manf_date:{
        type:Date,
    },
    p_exp_date:{
        type:Date,
    }
},{
    timestamps:true
});

module.exports=mongoose.model("Products",ProductSchema);