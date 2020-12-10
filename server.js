import express from 'express';
import dotenv from 'dotenv'
import config from './config'
import mongoose from 'mongoose';
import userRoute from './controllers_routes/userRoutes';
import productRoute from "./controllers_routes/ProductRoutes";
import OrdersRoute from "./controllers_routes/OrdersRoutes";
const path=require("path");

const Products=require("./models/ProductModel");
const app=express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))

app.use("/api/user/",userRoute);
app.use("/api/product_manage/",productRoute);
app.use("/api/orders/",OrdersRoute);
const mongodbUrl=config.MONGODB_URL;
mongoose.Promise = global.Promise;

mongoose.connect(mongodbUrl,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{console.log("db connected :)");}).catch(e=>{
    console.log("Your new error :-",e);
});

app.get("/api/products",(req,res)=>{
    res.send(data.products);
});

app.get("/api/product/:id",async(req,res)=>{
    try{
        const productId=req.params.id;
        const product=await Products.findOne({_id:mongoose.Types.ObjectId(productId)})
        if(!product) return res.status(404).send({message:"Product Not Found :("});
        
        res.status(201).send(product);
        
    }catch(e){
        res.status(400).send({message:"From here"+e.message});
    }
});


if(process.env.NODE_ENV==='production'){
    app.use(express.static('my_app2/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'my_app2','build','index.html'));
    });
}

const port =process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`server started on ${port}`);
})