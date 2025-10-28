import jwt from "jsonwebtoken"
import { User } from "../models/Users/user.js";
let isLoggedIn = (req,res,next)=>{
    
    let token =  req.headers.authorization?.split(" ")[1];
    jwt.verify(token,process.env.SECRET,async (err,decoder)=>{
        if(err)
        {
            return res.status(401).json({status:"failed",message:err?.message})
        }
        let user =  await User.findById(decoder?.user?.id).select("username _id role email");
                
         req.userAuth = user;
       
         
            next();
    })

   
}
export default isLoggedIn;