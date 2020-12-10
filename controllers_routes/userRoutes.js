import express from 'express';
import getToken from "../util";
import { loginValidation, registerValidation } from './validation';
import jwt from 'jsonwebtoken';
const User=require("../models/userModel");
const bcrypt=require("bcryptjs");
const Joi=require("@hapi/joi");


const router =express.Router();

router.post("/register",async(req,res)=>{
    
    //lets validate the data
    const {error}=registerValidation(req.body);
    if(error) return res.status(400).send({message:error.details[0].message});

    //check if email already exists
    const emailExist=await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send({message:"Email already exists"});
    
    //generate salt
    const salt=await bcrypt.genSalt(10);
    console.log(salt);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);
    
    //create new user
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        phoneno:req.body.phoneno,
        password:hashedPassword
    });
    
    try{
        
        const savedUser=await user.save();
        console.log("user saved");
        res.status(201).send({message:"Registration Successfull"});
    }catch(err){
        res.status(400).send({message:err});
      } 
});

/*
router.post('/register',async(req,res)=>{
  try{
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        phoneno:req.body.phoneno,
        password:req.body.password,
    });
    const newUser=await user.save();
    console.log("user saved ");
     if(newUser){
         req.send({
             _id:newUser.id,
             name:newUser.name,
             email:newUser.email,
             isAdmin:newUser.isAdmin,
             token:getToken(newUser)
         });
     }else{
         res.status(401).send({msg:"Invalid Data."});
     }
  }catch(e){
      console.log("Register Error :",e);
  }
}); */

router.post("/signin",async(req,res)=>{
    console.log("sign function start");
    //login Validation
    const {error}=loginValidation(req.body);
    console.log("sign after check");
    if(error) return res.status(400).send({message:error.details[0].message});
    console.log("cheking done no error in checking");
    //check if user there
    console.log("finding user in db");
    const user=await User.findOne({email:req.body.email});
    if(!user) return res.status(401).send({message:"Email not found "});
    console.log("user found in db");
    //check if password is correct

    const validPass=await bcrypt.compare(req.body.password,user.password);//please insert password from body first and then the hashed password from database to compare
    console.log("After comparison of hash password");
    if(!validPass) return res.status(401).send({message:"Invalid Password"});
    console.log("passowrd validated");

    //creating a jwt token 
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET_TOKEN);//it taken a secret key and some data as parameter to form a token
    
        res.header('auth-token',token).send({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            phoneno:user.phoneno,
            isAdmin:user.isAdmin,
            token:token,
        });
        console.log("sent token")
    
});

/*
router.post('/signin',async(req,res,next)=>{
    try{
        const signinUser=await User.findOne({
            email:req.body.email,
            password:req.body.password
        });
        if(signinUser){
            req.send({
                _id:signinUser.id,
                name:signinUser.name,
                email:signinUser.email,
                isAdmin:signinUser.isAdmin,
                token:getToken(user)
            });
        }else{
            res.status(401).send({msg:"Invalid Email or Password ."});
        }
    }catch(e){
        console.log("Your Cute Error :",e);
    }
}); */


router.get("/createadmin",async(req,res)=>{
    try {
        const user=new User({
            name:'Tancred',
            email:'tancredshaikh90@gmail.com',
            password:'Tancred@123',
            isAdmin:true
        });
        const newUser=await user.save();
        res.send(user);
    } catch (error) {
        res.send({message:error.message})
    }
});

export default router;


