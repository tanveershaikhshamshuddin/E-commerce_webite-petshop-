import express from 'express';
import getToken from "../util";
import jwt from 'jsonwebtoken';

import {  productValidation } from './validation';

const Products=require("../models/ProductModel");

const Joi=require("@hapi/joi");

const router =express.Router();


router.post("/addproduct",async(req,res)=>{
    try{
    console.log("product name :",req.body);
    const {error}=productValidation(req.body);
    if(error) return res.status(400).send({message:error.details[0].message});
    const pdExist=await Products.findOne({p_name:req.body.p_name});
    if(pdExist) return res.status(400).send({message:"Product with this name already exists"});
    
    if(req.body.p_category==="medicines" || req.body.p_category==="foods"){
       
    const product=new Products({
        p_name:req.body.p_name,
        p_category:req.body.p_category,
        p_price:req.body.p_price,
        p_pet_type:req.body.p_pet_type,
        p_quantity:req.body.p_quantity,
        p_category:req.body.p_category,
        p_image:req.body.p_image,
        p_description:req.body.p_description,
        p_manf_date:req.body.p_manf_date,
        p_exp_date:req.body.p_exp_date,
    }); 
    
    const newProduct=await product.save();
    console.log(newProduct);
    if(!newProduct) return res.status(500).send({message:"New Product not saved"});
    return res.status(201).send({message:"New Product Added"});
    
    }else{
        console.log("in to the product"); 
    const product=new Products({
        p_name:req.body.p_name,
        p_category:req.body.p_category,
        p_price:req.body.p_price,
        p_pet_type:req.body.p_pet_type,
        p_quantity:req.body.p_quantity,
        p_category:req.body.p_category,
        p_image:req.body.p_image,
        p_description:req.body.p_description,
    });
    console.log("out to the product");
    const newProduct=await product.save();
    console.log(newProduct);
    if(!newProduct) return res.status(500).send({message:"New Product not saved"});
    return res.status(201).send({message:"New Product Added"});
    }
    
    }catch(err){
        res.status(400).send({message:"UnExpected Error Occured Check your Network !",err});
    }
});

router.post("/searchproduct",async(req,res)=>{
    try{
        console.log("Product searching :",req.body.item_name);
        const pddata=await Products.findOne({p_name:req.body.item_name})
        console.log("product after search :",pddata)
        if(!pddata) return  res.status(400).send({message:"Product Not Found :("});
        
        res.status(201).send({message:pddata});
    }catch(err){
        res.status(400).send({message:"UnExpected Error Occured Check your Network !",err});
    }
})

router.put("/updateproduct/:id",async(req,res)=>{
    try{
        const options={
            new:true
        }
        const result=await Products.findOneAndUpdate({_id:req.params.id},req.body);
        if(!result) return res.send({message:"Product Not Found :)"});

        res.status(201).send({messsage:"Product Updated Successfully"});
    }catch(e){
        res.status(400).send({message:e})
    }
})

router.delete("/deleteproduct/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const result=await Products.findByIdAndDelete(id)
        if(!result) return res.status(400).send({message:"Deletion failed product not found"})

        res.status(201).send({message:"Deletion of Product Successfull :)"})
    }catch(e){
        res.status(400).send(e)
    }
})


router.get("/getproducts",async(req,res)=>{
    try{
        console.log("fetch camed correctly");
        const data=await Products.find({});
        if(!data) res.status(404).send("Not able to fetch data");
        console.log("Data :",data);
        res.status(201).send(data);
    }catch(e){
        res.status(400).send(e)
    }
})


router.get("/products",paginatedResults(Products),(req,res)=>{
    res.status(201).send({message:res.paginatedResults});
});

function paginatedResults(model){
    return async(req,res,next)=>{
        try{
                 const page=parseInt(req.query.page);
                 const limit=parseInt(req.query.limit);
                
                 const startIndex=(page-1)*limit;
                 const endIndex=page*limit;
     
                 const results={};
     
                 if(endIndex<await model.countDocuments().exec()){
                     results.next={
                         page:page+1,
                         limit:limit
                     }
                 }
                 if(startIndex>0){
                     results.previous={
                         page:page-1,
                         limit:limit
                     }
                 }
                 
                 
            results.results=await model.find().limit(limit).skip(startIndex).exec();
            res.paginatedResults=results
            next();

        }catch(e){
                res.status(400).send({message:e.message})
        }
    }
}

router.get("/products/pet",async(req,res)=>{
    try{
        console.log("in it");
        const page=parseInt(req.query.page);
        const limit=parseInt(req.query.limit);
        const pet_type=req.query.pet_type.toString();
        const category=req.query.category.toString();
        console.log(`pet Type: ${pet_type} and category :${category}`)
        const startIndex=(page-1)*limit;
        const endIndex=page*limit;

       
        const results={};


        if(startIndex>0){
            results.previous={
                page:page-1,
                limit:limit
            }
        }
   const data=await Products.find({$and:[{p_pet_type:pet_type},{p_category:category}]});
    if(!data) return res.status(400).send({message:`No Product of type ${pet_type} and category ${category}`});
    
    results.results=data.slice(startIndex,endIndex);
    results.total_length=data.length;

    console.log("Result :",results.results);
   if(endIndex<results.total_length){
       results.next={
           page:page+1,
           limit:limit
       }
   }

    res.status(201).send({message:results});
}catch(e){
       res.status(400).send({message:e.message});
}
});

router.get("/products/search_suggestion",async(req,res)=>{
    try{
        const page=parseInt(req.query.page);
        const limit=parseInt(req.query.limit);

        const startIndex=(page-1)*limit;
        const endIndex=page*limit;

        const results={};

        if(startIndex>0){
            results.previous={
                page:page-1,
                limit:limit
            }
        }
        const search_query=req.query.p_query.toString();
        const regexp=new RegExp(`^${search_query}`,'gi');       
        const data=await Products.find({$or:[{p_name:regexp},{p_category:regexp},{p_pet_type:regexp}]});
        if(!data) return res.status(400).send({message:`nothing like this found`});
        
    results.results=data.slice(startIndex,endIndex);
    results.total_length=data.length;

    console.log("Result :",results.results);
   if(endIndex<results.total_length){
       results.next={
           page:page+1,
           limit:limit
       }
   }
    res.status(201).send({message:results});
}catch(e){
       res.status(400).send({message:e.message});
}
});

router.get("/products/search_hints",async(req,res)=>{
    try{
        const data=await Products.find({},{_id:0,p_name:1});
        if(!data) return res.status(400).send({message:`nothing like this found`});
        const data2=data.map(dt=>{
            return dt.p_name
        })
        res.status(201).send({message:new Set(data2)});
}catch(e){
       res.status(400).send({message:e.message});
}
});



export default router;

