import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/slices/users/userSlice";
import postsReducer from "../Redux/slices/posts/postSlice";
import catagoyReducer from "../Redux/slices/catagory/catagorySlice";
import commentREducer from "../Redux/slices/Comments/commentsSlices";

const store = configureStore({
    reducer:{
        users:userReducer,
        posts:postsReducer,
        catagories:catagoyReducer,
        comments:commentREducer

    },
})

export default store;