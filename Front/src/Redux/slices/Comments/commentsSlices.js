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
  comments: [],
  comment: null,
};

export const createCommentAction = createAsyncThunk(
  "posts/createVomment",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `/api/v1/comments/${payload.postId}`,
        {
          message: payload?.message,
        },
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(createCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.comment = action.payload;
    });
    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    //----------------------------------------------------------------------

    //------------------------------------------------------------------------
     builder.addCase(resetErrorAction, (state) => {
      state.error = null;
    });
    builder.addCase(resetSuccessAction, (state) => {
      state.success = false;
    });






  }
});


const commentREducer = commentSlice.reducer;
export default commentREducer;