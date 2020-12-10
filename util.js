import jwt from 'jsonwebtoken';
import config from './config';

const getToken=(user)=>{
    return jwt.sign(
        {
            _id:user._id,
            name:user.name,
            email:user.email,
            phoneno:user.phoneno,
            isAdmin:user.isAdmin,
        },
        config.JWT_SECRET,{
        expiresIn:'48h'
    })
}

const isAuth=(req,res,next)=>{
    const token=req.header.authorization;
    if(token){
        const onlyToken=token.slice(7,token.length);
        jwt.verify(onlyToken,config.JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(401).send({message:"Invalid Token"});
            }
            req.user=token;
            next();
            return
        })
    }
    return res.status(401).send({message:"Token is not Supplied. "});
}
const isAdmin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){ //if admin token verified successfully then just moveto the remaining function of the page using next        
        return next();
    }
    return res.status(401).send({msg:"Admin Token is not valid "});

}
export {
    getToken,
    isAdmin,
    isAuth
}