import mongoose from "mongoose";

let postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    claps: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shares: {
      type: Number,
      default: 0,
    },
    PostViews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    catagory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catagory",
      required: true,
    },
    scheduledPublished: {
      type: Date,
      default: null,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    disLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const Post = mongoose.model("Post", postSchema);
