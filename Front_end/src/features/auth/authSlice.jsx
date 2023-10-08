import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser } from "./authAPI";

const initialState = {
  user: null,
};
export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    // console.log(userData);
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (userData) => {
    // console.log(userData);
    const response = await loginUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        // state.status = "idle";
        console.log(action.payload);
        state.user = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        // state.status = "idle";
        // console.log(action.payload.user);
        state.user = action.payload.user;
      });
  },
});

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
