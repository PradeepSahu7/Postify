import mongoose from "mongoose";
let catagorySchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    shares:{
        type:Number,
        default:0
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],
    

},{timestamps:true,
    toJSON:{
        virtuals:true,
    },
    toObject:{
        virtuals:true,
    }
})
export const Catagory = mongoose.model("Catagory",catagorySchema);