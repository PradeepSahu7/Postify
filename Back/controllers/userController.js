import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/Users/user.js";
import generateToken from "../Utils/generateToken.js"
import asyncHandler from "express-async-handler"
import { sendEmail } from "../Utils/sendEmail.js";
import crypto from "crypto"
import { sendAccountVerificationEmail } from "../Utils/sendVerificationEmail.js";

export const register =  asyncHandler(async (req , res)=>{   
	    let {username,email,password} = req.body;
		const existingUser = await User.findOne( { email });
		if (existingUser) {
			throw new Error("User already exists");
		}
        let salt = await bcrypt.genSalt(10);
        let hashedPassword =  await bcrypt.hash(password,salt);
        console.log("hashed password",hashedPassword);
        

		const newUser = new User({
			username,
			email,
			password:hashedPassword,
			notification: { email }
		});

		const savedUser = await newUser.save();
		// const { password: _password, ...userData } = savedUser.toObject();
        
		return res.status(201).json({ message: "User created successfully", user: savedUser });
	
}         
) 

export const login = asyncHandler(async (req,res)=>{
    let {email,password} = req.body;
   
        let user =  await User.findOne({email});
        if(!user)
        {
            throw new Error("User not found");
        }
       
        
        let pwd =  await bcrypt.compare(password,user?.password);
        if(!pwd)
        {
            throw new Error("Invalid password");
        }

        user.lastLogin= new Date();
        let u = await user.save({new:true});
        let token = generateToken(u);

        
        return res.json({ message: "Login successful", email: u.email,id:u._id,username:u.username,role:u.role,token:token });
   
})

export const profile = asyncHandler(async (req,res)=>{
        let {id} = req.userAuth
        console.log(id);
        let user = await User.findById(id).populate({
            path:"posts",
            model:"Post"
        }).populate({
            path:"following",
            model:"User"
        }).populate({
            path:"followers",
            model:"User"
        }).populate({
            path:"blockUsers",
            model:"User"
        }).populate({
            path:"profileViewer",
            model:"User"
        });
        return res.json({message:"profile route",user})
   
})






export const getPublicProfile = asyncHandler(async (req,res)=>{

        const {userId} = req.params;
        let user = await User.findById(userId).select("-password").populate("posts");
        return res.json({message:"public profile route",user})
   
})















//block user 
export const blockUser  = asyncHandler(async(req,res)=>{
    let {userToBeBlocked} =req.params; //user id neede to be blocked
    
    
    let {id} = req.userAuth; //this is current user

    let blockUserExists = User.findById(userToBeBlocked);
    
    if(!blockUserExists)
    {
        throw new Error ("User Does not Exists");
    }
    //checking if we are blocking our self
    if( id.toString()== userToBeBlocked.toString())
    {
        throw new Error ("Can not Block YourSelf");
    }

    //chekcing if the user which needed to be blocked is already blocked by the current user or not
    let currentUser = await User.findById(id);
   
    
    if(currentUser.blockUsers.includes(userToBeBlocked))
    {
        throw new Error ("This User had Already Been Blocked By You");
    }

    currentUser.blockUsers.push(userToBeBlocked);
    let user = await currentUser.save({new:true});  
      return res.json({
        status:"Success",
        message:`User blocked Successfully`,
        user
    })


})

//Unblock user 
export const unBlockUser  = asyncHandler(async(req,res)=>{
    let {userToBeUBlocked} =req.params; //user id neede to be Unblocked
   
    
    let {id} = req.userAuth; //this is current user

    let UnblockUserExists = User.findById(userToBeUBlocked);
    
    if(!UnblockUserExists)
    {
        throw new Error ("User to unblock Does not Exists");
    }
    //checking if we are unblocking our self
    if( id.toString()== userToBeUBlocked.toString())
    {
        throw new Error ("Can not Block/Unblock YourSelf");
    }

    //chekcing if the user which needed to be unblocked is already blocked by the current user or not
    let currentUser = await User.findById(id);
    console.log(currentUser);
    
    if(!currentUser.blockUsers.includes(userToBeUBlocked))
    {
        throw new Error ("This User had Already Been UnBlocked By You");
    }
    //removed the user from current user blocked list
     currentUser.blockUsers = currentUser.blockUsers.filter((e)=>e.toString() !== userToBeUBlocked.toString() );
     
    let user = await currentUser.save({new:true});  
      return res.json({
        status:"Success",
        message:`User Unblocked Successfully`,
        user
    })


})

//view another user profile
export const viewOtherProfile = asyncHandler(async(req,res)=>{
    let {otherUserProfileId} = req.params;
    let currrentUserid = req?.userAuth?._id;
    let userProfileExists = await User.findById(otherUserProfileId)
    if(!userProfileExists)
    {
        throw new Error ("User Profile dose not exists");
    }

    // if currentuser id already exixts inside the otherUserProfileId profileViewer property that means current user has already seen its profile 
    //if currentuser id  is not present inside otherUserProfileId profileViewer property than we will add current user id to it
    if(userProfileExists.profileViewer.includes(currrentUserid))
    {
        throw new Error("You had been to this Profile Once before");
    }
    userProfileExists.profileViewer.push(currrentUserid);
   let updatedProfile = await userProfileExists.save({new:true})
   return res.json({
    status:"Success",
    message:`Profile Successfullt viewed`,
    updatedProfile
})
    
})

//following and Followers

export const  followingUser= asyncHandler(async(req,res)=>{
    let {id} = req.userAuth;
    let {otherPersonIdToFollow} = req.params;

    //changing other pereson followers
    let otherPersonIdExists = await User.findById(otherPersonIdToFollow);
    if(!otherPersonIdExists)
       {
            throw new Error ("User Profile dose not exists");
       }

       //Chencking that we are not follwoing ourself
       if(otherPersonIdToFollow.toString == id.toString())
       {
        throw new Error ("YOU can not follow YourSelf")
       }
    //changing our follwoing 
    let currentUser = await User.findByIdAndUpdate(id,{ $addToSet:{following:otherPersonIdExists._id} },{new:true});
    let otherUser  = await User.findByIdAndUpdate(otherPersonIdToFollow,{$addToSet:{followers:id}},{new:true});

    return res.json({status:"Sucess", message:" followed Successfully",currentUser,otherUser })



})



export const  unfollowingUser= asyncHandler(async(req,res)=>{
    let {id} = req.userAuth;
    let {otherPersonIdToUnFollow} = req.params;

    //changing other pereson followers
    let otherPersonIdExists = await User.findById(otherPersonIdToUnFollow);
    if(!otherPersonIdExists)
       {
            throw new Error ("User Profile dose not exists");
       }

      
       if(otherPersonIdToUnFollow.toString == id.toString())
       {
        throw new Error ("YOU can not unfollow YourSelf")
       }
       
        let currentUser = await User.findById(id);
       if(!currentUser.following.includes(otherPersonIdExists._id))
       {
        throw new Error("You never followed this person before")
       }
       
       let newCurrentUser = await User.findByIdAndUpdate(currentUser._id,{$pull:{following:otherPersonIdExists._id}},{new:true});
      let newotherUser  = await User.findByIdAndUpdate(otherPersonIdExists._id,{$pull:{followers:currentUser._id}},{new:true})

    return res.json({status:"Sucess", message:" Unfollowed Successfully",newCurrentUser,newotherUser })



})


export const forgotPassword = asyncHandler(async(req,res)=>{
    let {email}= req.body;

    let userExists = await User.findOne({email});
    if(!userExists) 
    {
        throw new Error ("This Email is Not Registered With Us");
    }
   let resetToken = await userExists.generatePasswordResetToken();
   //save changes to DB token and reset time
   await userExists.save();
    sendEmail(email,resetToken);
   return res.json({
    status:'success',
    message:'Password reset Token send to your Email Successfullly'
   })
})

//resting forgot password
export const resetPassword = asyncHandler(async(req,res)=>{
    let {resetToken} = req.params;
    let {password} = req.body;

    let hashedRestToken  =  crypto.createHash("sha256").update(resetToken).digest("hex")
    let userExists = await User.findOne({paswordResetToken:hashedRestToken,passwordResetExpires:{$gt:Date.now()}});
    if(!userExists)
    {
        throw new Error("Password Reset Time Expired");
    }
    let salt = await bcrypt.genSalt(10)
    userExists.password = await bcrypt.hash(password,salt);
    userExists.paswordResetToken=null;
    userExists.passwordResetExpires=null;

    await userExists.save();
    return res.json({status:"success",message:"Password Reseted Successfullt"})

    

})


export const accountVerificationEmail = asyncHandler(async(req,res)=>{
    let {id} = req.userAuth;
    let currentUser  = await User.findById(id);
    if(!currentUser)
    {
        throw new Error("User not Found")
    }
    let accountVerificationToken = await currentUser.generateAccountVerificationToken();
    await currentUser.save();
    sendAccountVerificationEmail(currentUser.email,accountVerificationToken);
    return res.json({status:"success",message:`account verification mail is send to your registered Id ${currentUser.email}`})
})

export const accountVerificationToken = asyncHandler(async(req,res)=>{
    let {token}= req.params;

    let hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    let currentUser  =  await User.findOne({accountVerificationToken:hashedToken,accountVerificationExpires:{$gt:Date.now()}});
    if(!currentUser)
    {
        throw new Error("Token Expires");
    }
    currentUser.accountVerificationToken=null;
    currentUser.accountVerificationExpires=null;
    currentUser.isVerified=true;
    await currentUser.save()
    return res.json({status:"Success",message:"Account successfully Verified"})
})