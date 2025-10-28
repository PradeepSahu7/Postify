import mongoose from "mongoose"
import crypto from "crypto";
import { log } from "console";

let userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true,
        enum:["user","admin"],
        default:"user"
    },
     password:{
        type:String,
        required:true,
    },
    lastlogin:{
        type:Date,
        default:Date.now()
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    accountLevel:{
        type:String,
        enum:["bronze","silver","gold"],
        default:"bronze"
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverImage:{
        type:String,
        default:""
    },
    bio:{
        type:String
    },
    location:{
        type:String
    },
    notification:{
        email:{type:String,required:true}
    },
    gender:{
        type:String,
        enum:["male","female","Prefer not to say","non binary"]
    },
    profileViewer:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}], 
    following:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    blockUsers:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:"Post"}],
    likedPosts:[{type:mongoose.Schema.Types.ObjectId,ref:"Post"}],

    paswordResetToken:{type:String},
    passwordResetExpires:{type:Date},

    accountVerificationToken:{type:String},
    accountVerificationExpires:{type:Date}

},{
    timestamps:true,
    toJSON:{
        virtuals:true,
    },
    toObject:{
        virtuals:true
    }
})

userSchema.methods.generatePasswordResetToken=function(){
    let resetToken  = crypto.randomBytes(20).toString("hex");
    this.paswordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    //set expire time
    this.passwordResetExpires=Date.now()+10*60*1000;
    return resetToken;
}

userSchema.methods.generateAccountVerificationToken= function (){
    let resetToken  = crypto.randomBytes(20).toString("hex");
    this.accountVerificationToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    //set expire time
    this.accountVerificationExpires=Date.now()+10*60*1000;
    console.log("Account Verfication Token = ",resetToken);
    return resetToken;
}
export const User = mongoose.model("User", userSchema);