import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { Post } from "../models/Posts/posts.js";
import { User } from "../models/Users/user.js";
import { Catagory } from "../models/Categories/catagory.js";

export const createPost = asyncHandler(async (req, res) => {
  let id = req.userAuth._id;
  let { path } = req.file;
  let { title, content, catagoryId } = req.body;
  let isPostExists = await Post.findOne({ title });
  if (isPostExists) {
    throw new Error("Post already Exixts Chnage the title");
  }
  let post = await Post.create({
    title,
    content,
    catagory: catagoryId,
    author: id,
    image: path,
  });
  let user = await User.findByIdAndUpdate(
    id,
    { $push: { posts: post._id } },
    { new: true }
  );
  let catagory = await Catagory.findByIdAndUpdate(
    catagoryId,
    { $push: { posts: post._id } },
    { new: true }
  );
  return res.json({
    status: "Success",
    message: "Post Created",
    post,
    user,
    catagory,
    image: req.file.path,
  });
  // // console.log("post",req?.file);
  // // console.log("id",id);
  // // console.log("content",title);
  // console.log("req",path);
  // return res.json({
  //     stsa:"success"
  // })
});

export const getAllPosts = asyncHandler(async (req, res) => {
  let id = req.userAuth._id;

  const currentDate = new Date();
  //finding all those user who have blocked current user
  let userBlockingTheCurrent = await User.find({ blockUsers: id });
  //fetching id  all those user who have blocked current user
  let blockingUserId = userBlockingTheCurrent.map((e) => e._id);
  //fetcng those posts whhise author is not in blockinguserid and also filtering the post on the basis of scheduled time
  let posts = await Post.find({
    author: { $nin: blockingUserId },
    $or: [
      { scheduledPublished: { $lte: currentDate }, scheduledPublished: null },
    ],
  })
    .populate({
      path: "author",
      model: "User",
      select: "email username role following followers accountLevel",
    })
    .populate({
      path: "catagory",
      model: "Catagory",
    });

  return res.json({
    status: "success",
    message: "All posts Successfully fetched",
    posts,
  });
});
export const getPost = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let post = await Post.findById(id).populate("author").populate({

    path:"comments",
    model:"Comment",
    populate:{
      path:"author",
      select:"username"
    }

  }).populate('catagory');
  if (post) {
    return res.json({
      status: "success",
      message: "All posts Successfully fetched",
      post,
    });
  } else {
    return res.json({
      status: "failed",
      message: "Post not available",
      post,
    });
  }
});

export const deletePost = asyncHandler(async (req, res, next) => {
  let id = req.userAuth._id;
  let { postid } = req.params;
  const post = await Post.findById(postid);
  if (post.author.toString() !== id.toString()) {
    throw new Error("You can not delete this post");
  }
  await Post.findByIdAndDelete(postid);
  return res.json({
    status: "success",
    message: "All posts Successfully Deleted",
  });
});

export const updatePost = asyncHandler(async (req, res) => {
  let { postId } = req.params;
  let { title, content, catagoryId } = req.body;

  let postExists = await Post.findById(postId);
  if (!postExists) {
    throw new Error("Post does not Exists");
  }

  let updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      image: req?.file?.path ? req?.file?.path : postExists.image,
      title: title ? title : postExists.title,
      content: content ? content : postExists.content,
      catagory: catagoryId ? catagoryId : postExists.catagoryId,
    },
    { new: true }
  );

  return res.json({
    status: "success",
    message: " Posts Successfully Updated",
    updatedPost,
  });
});

export const likePost = asyncHandler(async (req, res) => {
  console.log("=== LIKE POST CALLED ===");
  let { postId } = req.params;
  console.log("PostId:", postId);
  let id = req.userAuth._id;
  console.log("User ID:", id);

  let posts = await Post.findById(postId);
  console.log("Post found:", posts ? "YES" : "NO");
  if (!posts) {
    throw new Error("Post Does Not Exists");
  }

  // Clean up PostViews if it has invalid data
  if (posts.PostViews && Array.isArray(posts.PostViews)) {
    posts.PostViews = posts.PostViews.filter((view) =>
      mongoose.Types.ObjectId.isValid(view)
    );
  }

  // Remove user from dislikes if they previously disliked
  posts.disLikes = posts.disLikes.filter(
    (userId) => userId.toString() !== id.toString()
  );

  // Add user to likes (if not already there)
  const alreadyLiked = posts.likes.some(
    (userId) => userId.toString() === id.toString()
  );
  if (!alreadyLiked) {
    posts.likes.push(id);
  }

  const updatedPost = await posts.save();

  return res.json({
    status: "success",
    message: "post liked Successfully",
    post: updatedPost,
  });
});

export const disLikePost = asyncHandler(async (req, res) => {
  console.log("=== DISLIKE POST CALLED ===");
  let { postId } = req.params;
  console.log("PostId:", postId);
  let id = req.userAuth._id;
  console.log("User ID:", id);

  let posts = await Post.findById(postId);
  console.log("Post found:", posts ? "YES" : "NO");
  if (!posts) {
    throw new Error("Post Does Not Exists");
  }

  // Clean up PostViews if it has invalid data
  if (posts.PostViews && Array.isArray(posts.PostViews)) {
    posts.PostViews = posts.PostViews.filter((view) =>
      mongoose.Types.ObjectId.isValid(view)
    );
  }

  // Remove user from likes if they previously liked
  posts.likes = posts.likes.filter(
    (userId) => userId.toString() !== id.toString()
  );

  // Add user to dislikes (if not already there)
  const alreadyDisliked = posts.disLikes.some(
    (userId) => userId.toString() === id.toString()
  );
  if (!alreadyDisliked) {
    posts.disLikes.push(id);
  }

  const updatedPost = await posts.save();

  return res.json({
    status: "success",
    message: "post disLiked Successfully",
    post: updatedPost,
  });
});

export const clapPost = asyncHandler(async (req, res) => {
  let { postId } = req.params;
  let posts = await Post.findById(postId);
  if (!posts) {
    throw new Error("Post Does Not Exists");
  }

  let updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $inc: { claps: 1 } },
    { new: true }
  );
  return res.json({
    status: "Success",
    message: "you Clapped Successfully",
    post: updatedPost,
  });
});

export const schedulePost = asyncHandler(async (req, res) => {
  let { postId } = req.params;
  let { scheduledPublished } = req.body;

  if (!postId || !scheduledPublished) {
    throw new Error("Posts Id and Schedule Date are required");
  }
  let posts = await Post.findById(postId);
  if (!posts) {
    throw new Error("Post Does Not Exists");
  }

  if (!posts.author == req.userAuth._id) {
    throw new Error("You can only publish your own Post");
  }
  let scheduledDate = new Date(scheduledPublished);
  let currentDate = new Date();
  if (scheduledDate < currentDate) {
    throw new Error("Schedule date can not be previous Date");
  }
  posts.scheduledPublished = scheduledDate;
  await posts.save();
  return res.json({
    status: "Success",
    message: "Successfullly Scheduled the post",
    posts,
  });
});

export const getpublicPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .populate("author catagory");
  if (!posts) {
    throw new Error("No Post Available");
  }
  return res.json({
    status: "Success",
    message: "Public Posts fetched Successfully",
    posts,
  });
});

export const postViewCount = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const id = req.userAuth._id;
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post Does not Exists");
  }

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $addToSet: { PostViews: id } },
    { new: true }
  ).populate("author");

  return res.json({
    status: "Success",
    message: "you viewed Successfully",
    post: updatedPost,
  });
});
