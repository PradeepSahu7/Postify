import mongoose from "mongoose";
import dotenv from "dotenv";
import { Post } from "../models/Posts/posts.js";

dotenv.config();

const cleanupPosts = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to database");

    // Find all posts
    const posts = await Post.find({});
    console.log(`Found ${posts.length} posts to check`);

    let updatedCount = 0;

    for (const post of posts) {
      let needsUpdate = false;

      // Clean up PostViews - remove invalid ObjectIds
      if (post.PostViews && Array.isArray(post.PostViews)) {
        const originalLength = post.PostViews.length;
        post.PostViews = post.PostViews.filter((view) =>
          mongoose.Types.ObjectId.isValid(view)
        );

        if (post.PostViews.length !== originalLength) {
          needsUpdate = true;
          console.log(
            `Cleaned PostViews for post ${post._id}: ${originalLength} -> ${post.PostViews.length}`
          );
        }
      }

      // Set image to empty string if it doesn't exist (since we made it optional)
      if (!post.image) {
        post.image = "";
        needsUpdate = true;
        console.log(`Set empty image for post ${post._id}`);
      }

      if (needsUpdate) {
        await post.save({ validateBeforeSave: false });
        updatedCount++;
      }
    }

    console.log(`\n✅ Cleanup complete! Updated ${updatedCount} posts.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during cleanup:", error);
    process.exit(1);
  }
};

cleanupPosts();
