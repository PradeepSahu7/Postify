import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalSlice/globalSlice";
import axios from "axios";

const INITIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  posts: [],
  post: null,
};

export const fetchPublicPostAction = createAsyncThunk(
  "posts/fetch-public-post",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await axios.get("/api/v1/posts/public");
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const createPostAction = createAsyncThunk(
  "posts/createPosts",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("content", payload?.content);
      formData.append("catagoryId", payload?.catagory);
      formData.append("file", payload?.image);
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post("/api/v1/posts/", formData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getSinglePostAction = createAsyncThunk(
  "post/singlePost",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`/api/v1/posts/${payload}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchPrivatePostAction = createAsyncThunk(
  "post/privatePost",
  async (payload, { rejectWithValue, getState }) => {
    try {
      // Get token from state
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get("/api/v1/posts", config);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Failed to fetch posts" }
      );
    }
  }
);

export const DeletePostAction = createAsyncThunk(
  "post/deletePost",
  async (payload, { rejectWithValue, getState }) => {
    try {
      console.log("Private Post called");

      // Get token from state
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`/api/v1/posts/${payload}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Failed to fetch posts" }
      );
    }
  }
);

export const updatePostAction = createAsyncThunk(
  "post/updatePost",
  async (payload, { rejectWithValue, getState }) => {
    try {
      console.log("Private Post called");

      // Get token from state
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      console.log("Postt updaed route", payload);

      const response = await axios.put(
        `/api/v1/posts/${payload.postId}`,
        payload,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Failed to fetch posts" }
      );
    }
  }
);

export const likePostAction = createAsyncThunk(
  "post/likePost",
  async (payload, { rejectWithValue, getState }) => {
    try {
      // Get token from state
      const token = getState().users?.userAuth?.userInfo?.token;

      // Check if token exists
      if (!token) {
        return rejectWithValue({
          message: "No authentication token found. Please log in again.",
        });
      }

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `/api/v1/posts/like/${payload}`,
        {},
        config
      );
      console.log("like post ", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Failed to fetch posts" }
      );
    }
  }
);

export const dislikePostAction = createAsyncThunk(
  "post/dislikePost",
  async (payload, { rejectWithValue, getState }) => {
    try {
      // Get token from state
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `/api/v1/posts/dislike/${payload}`,
        {},
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Failed to fetch posts" }
      );
    }
  }
);



export const clapPostAction = createAsyncThunk(
  "post/clapPost",
  async (payload, { rejectWithValue, getState }) => {
    try {
      // Get token from state
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `/api/v1/posts/claps/${payload}`,
        {},
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Failed to fetch posts" }
      );
    }
  }
);





export const viewPostAction = createAsyncThunk(
  "post/viewPost",
  async (payload, { rejectWithValue, getState }) => {
    try {
      // Get token from state
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `/api/v1/posts/${payload}/post-view-count`,
        {},
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Failed to fetch posts" }
      );
    }
  }
);


const postsSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,

  extraReducers: (builder) => {
    builder.addCase(fetchPublicPostAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchPublicPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.posts = action.payload;
    });
    builder.addCase(fetchPublicPostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    //--------------------------------------------------------------------------------------

    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.post = action.payload;
    });
    builder.addCase(createPostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    //---------------------------------------------------------------------------------------------------

    builder.addCase(getSinglePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSinglePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      // state.success = true;
      state.post = action.payload;
    });
    builder.addCase(getSinglePostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    //-------------------------------------------------------------------------------------------------------------------
    builder.addCase(fetchPrivatePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPrivatePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.posts = action.payload;
    });
    builder.addCase(fetchPrivatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    //-----------------------------deleet post action-----------------------------------------------------------------------------------------------

    builder.addCase(DeletePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(DeletePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(DeletePostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.post = action.payload;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    //----------------------------------------------------------------------------------------------

    builder.addCase(likePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(likePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.post = action.payload;
    });
    builder.addCase(likePostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    //------------------------------------------------------------------------------------------------------------

    builder.addCase(dislikePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(dislikePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.post = action.payload;
    });
    builder.addCase(dislikePostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    //------------------------------------------------------------------------------------------------------------


    builder.addCase(clapPostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(clapPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.post = action.payload;
    });
    builder.addCase(clapPostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

  //----------------------------------------------------------------------------------------------------------------
    builder.addCase(viewPostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(viewPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.post = action.payload;
    });
    builder.addCase(viewPostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });


    //-------------------------------------------------------------------------------------------------------------------------------------------
    builder.addCase(resetErrorAction, (state) => {
      state.error = null;
    });
    builder.addCase(resetSuccessAction, (state) => {
      state.success = false;
    });
  },
});

const postsReducer = postsSlice.reducer;
export default postsReducer;
