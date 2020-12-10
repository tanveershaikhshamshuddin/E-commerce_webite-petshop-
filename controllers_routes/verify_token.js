const jwt=require("jsonwebtoken");
module.exports=async function(req,res,next){
    const token=req.header("auth-token");
    if(!token) return res.status(401).send({msg:"Access Denied"});
    
    try{
        const verified=await jwt.verify(token,process.env.JWT_SECRET_TOKEN);
        req.user=verified;
        next();
    }catch(err){
        res.status(400).send({msg:"Invalid token"});
    }
}

