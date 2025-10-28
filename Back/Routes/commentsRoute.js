import express from "express"
import isLoggedIn from "../middleware/isLoggedIn.js"
import { createComents, deleteComment, updateComment } from "../controllers/commentsController.js";
let commentRouter =  express.Router();
commentRouter.post("/:postId",isLoggedIn,createComents)
commentRouter.put("/:commentId",isLoggedIn,updateComment)
commentRouter.delete("/:id",isLoggedIn,deleteComment)


export default commentRouter;