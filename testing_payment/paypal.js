const cors=require("cors");
const express=require("express");
const stripe=require("stripe")("sk_test_51HgpgoHSKx3urDTGj55YW9wOfJ8hFTY8XlWKaMiU2UJdLTw2vttCnvkUiTQYkvNDfXsrW8dM60IubU2U9pggIS1L00FSHSfgL2");

const uuid=require("uuid/v4");
const app=express();

//middle ware
app.use(express.json());
app.use(cors());

//routes
app.get("/",(req,res)=>{
    res.send("it works in my website");
});

app.post("/payment",(req,res)=>{
    const {product,token}=req.body;
    console.log(product);
    const idempotencyKey=uuid();
    
    return stripe.customer.create({
        email:token.email,
        source:token.id
    }).then(customer=>{
        stripe.charges.create({
            amount:product.price*100,
            currency:'usd',
            customer:customer.id,
            receipt_email:token.email,
            description:product.name,
            shipping:{
                name:token.card.name,
                address:{
                    country:token.card.address_country
                }
            }
        },{idempotencyKey})
    }).then(result=>{
        res.status(201).json(result)
    }).catch(e=>{
        console.log(e);
    })
})

//listen
app.listen(4890)


