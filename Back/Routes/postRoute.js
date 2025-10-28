import express from "express";
import isLoggedIn from "../middleware/isLoggedIn.js";
import {
  clapPost,
  createPost,
  deletePost,
  disLikePost,
  getAllPosts,
  getPost,
  getpublicPosts,
  likePost,
  postViewCount,
  schedulePost,
  updatePost,
} from "../controllers/postController.js";
import { isAccountVerified } from "../middleware/isAccountVerified.js";
import multer from "multer";
import storage from "../Utils/fileUpload.js";
let postRouter = express.Router();

const upload = multer({ storage });
// postRouter.post("/",isLoggedIn,isAccountVerified,createPost)
postRouter.get("/public", getpublicPosts);
postRouter.post("/", isLoggedIn, upload.single("file"), createPost);
// postRouter.post("/",isLoggedIn,createPost)
postRouter.get("/", isLoggedIn, getAllPosts);
postRouter.get("/:id", isLoggedIn, getPost);
postRouter.delete("/:postid", isLoggedIn, deletePost);
postRouter.put("/:postId", isLoggedIn, upload.single("file"), updatePost);

postRouter.put("/like/:postId", isLoggedIn, likePost);

postRouter.put("/dislike/:postId", isLoggedIn, disLikePost);
postRouter.put("/claps/:postId", isLoggedIn, clapPost);
postRouter.put("/schedule/:postId", isLoggedIn, schedulePost);
postRouter.put("/:postId/post-view-count", isLoggedIn, postViewCount);

export default postRouter;
