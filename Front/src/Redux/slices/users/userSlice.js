import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalSlice/globalSlice";

const INITIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  users: [],
  user: null,
  isUpdated: false,
  isDeleted: false,
  isEmailSent: false,
  isPasswordRest: false,
  profile: {},
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

export const loginAction = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await axios.post("/api/v1/users/login", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const logOutAction = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("userInfo");
  return true;
});

export const registerAction = createAsyncThunk(
  "user/register",
  async (payload, { rejectWithValue, getState }) => {
    try {
      let res = await axios.post("/api/v1/users/register", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const publicProfileAction = createAsyncThunk(
  "user/publicProfile",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      let res = await axios.get(`/api/v1/users/public-profile/${payload}`,config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.userAuth.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    //====================================================
    builder.addCase(registerAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.user = action.payload;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    //======================================================================================================================


  builder.addCase(publicProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(publicProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.profile = action.payload;
      console.log("action paylaod ",action.payload);
      
    });
    builder.addCase(publicProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });



    //====================================================
    builder.addCase(resetErrorAction, (state) => {
      state.error = null;
    });
    builder.addCase(resetSuccessAction, (state) => {
      state.success = false;
    });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
