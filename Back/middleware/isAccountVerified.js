import { User } from "../models/Users/user.js";

export const isAccountVerified = async(req,res,next)=>{
    let {id}= req.userAuth;
    try {
        let user = await User.findById(id);
        if(!user.isVerified)
        {
            throw new Error("Account is not Verified");
        }
        next();

    } catch (error) {
        return res.status(500).json({
            message:error?.message
        })
    }
}