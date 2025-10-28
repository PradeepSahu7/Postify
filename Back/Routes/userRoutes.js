import express from "express"
import { accountVerificationEmail, accountVerificationToken, blockUser, followingUser, forgotPassword, getPublicProfile, login, profile, register, resetPassword, unBlockUser, unfollowingUser, viewOtherProfile } from "../controllers/userController.js"
import isLoggedIn from "../middleware/isLoggedIn.js";
let userRouter = express.Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.get("/profile",isLoggedIn,profile);
userRouter.get("/public-profile/:userId",getPublicProfile);

userRouter.put("/block/:userToBeBlocked",isLoggedIn,blockUser);
userRouter.put("/unblock/:userToBeUBlocked",isLoggedIn,unBlockUser);
userRouter.get("/view-another-profile/:otherUserProfileId",isLoggedIn,viewOtherProfile);
userRouter.put("/following/:otherPersonIdToFollow",isLoggedIn,followingUser);
userRouter.put("/unfollowing/:otherPersonIdToUnFollow",isLoggedIn,unfollowingUser);
userRouter.post("/forgot-password",forgotPassword);
userRouter.post("/reset-password/:resetToken",resetPassword);
userRouter.put("/account-verification-email",isLoggedIn,accountVerificationEmail);
userRouter.put("/verify-account/:token",isLoggedIn,accountVerificationToken);



export default userRouter;
