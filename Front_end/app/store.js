import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../src/features/auth/authSlice";
import taskSlice from "../src/features/task/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tasks: taskSlice,
  },
});
