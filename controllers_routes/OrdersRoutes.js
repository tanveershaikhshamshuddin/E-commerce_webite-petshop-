import express from 'express';
import getToken from "../util";
import jwt from 'jsonwebtoken';

import {  productValidation } from './validation';

const Products=require("../models/ProductModel");
const User=require("../models/userModel");
const Order=require("../models/OrderModel");
const Joi=require("@hapi/joi");
const router =express.Router();



//----------order Section-------//
router.post("/",async (req,res)=>{
    try{
    console.log("Into Orders Successfully !");
    const order=await Order(req.body).save();  
    
    //deducting the quantity from database.
    req.body.o_cartItems.map(async(item)=>{
        await Products.findOneAndUpdate({_id:item._id},{$inc:{p_quantity:-item.count}});
    });

    return res.status(201).send({message:order});
    }catch(e){
        return res.status(400).send({message:e.message})
    }
})




export default router;

