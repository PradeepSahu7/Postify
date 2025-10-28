import asyncHandler from "express-async-handler";
import { Comment } from "../models/Comments/comment.js"; 
import { Post } from "../models/Posts/posts.js";

export const createComents = asyncHandler(async(req , res)=>{
    let {message}= req.body;
    let {postId} = req.params;
    let {id} = req.userAuth;

    
    let comment = await Comment.create({
        message,
        author:id,
        postId:postId
    })
  
    
    
    let post = await Post.findByIdAndUpdate(postId,{$push:{ comments:comment._id }},{new:true});
     console.log(post.comments);
     
    return res.json({
        status:"Success",
        message:'Successfully Added Comments',
        post
    })
})

export const deleteComment =asyncHandler(async(req,res)=>{
        let {id} =req.params;

        let comment = await Comment.findByIdAndDelete(id);
        return res.json({
            status:"Success",
            message:'Successfully Deleted Comments',
        })
})

export const updateComment = asyncHandler(async(req,res)=>{
    let {message}= req.body;
    let {commentId} = req.params;

    
  let comment = await Comment.findByIdAndUpdate(commentId,{message},{new:true})
  return res.json({
    status:"Success",
    message:"Comment Updated Successfully",
    comment
  })
}) 