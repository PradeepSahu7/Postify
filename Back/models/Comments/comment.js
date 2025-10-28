import mongoose, { mongo } from "mongoose";
let commentSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

  },
  {  timestamps: true, }
);
export const Comment = mongoose.model("Comment", commentSchema);
