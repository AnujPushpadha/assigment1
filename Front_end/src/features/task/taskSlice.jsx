import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTasks, deleteTasks, editTasks, fetchUserTasks } from "./taskAPI";

const initialState = {
  tasks: [],
};
export const createTaskAsync = createAsyncThunk(
  "task/createTask",
  async (Data) => {
    // console.log(Data);
    const response = await createTask(Data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchUserTaskAsync = createAsyncThunk(
  "task/fetchTask",
  async (token) => {
    // console.log(token);
    const response = await fetchUserTasks(token);
    // console.log(response.data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const addTaskAsync = createAsyncThunk("task/addTask", async (data) => {
  //   console.log(data);
  const response = await addTasks(data);
  console.log(response.data);
  // The value we return becomes the `fulfilled` action payload
  //   return response.data;
});

export const deleteTaskAsync = createAsyncThunk(
  "task/deleteTask",
  async (id) => {
    // console.log(id);
    const response = await deleteTasks(id);
    console.log(response.data);
    // The value we return becomes the `fulfilled` action payload
    //   return response.data;
  }
);

export const editTaskAsync = createAsyncThunk(
  "task/deleteTask",
  async (data) => {
    // console.log(data.id, data.task);
    const response = await editTasks(data.id, data.task);
    //   console.log(response.data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserTaskAsync.fulfilled, (state, action) => {
        // state.status = "idle";
        // console.log(action.payload);
        state.tasks = action.payload;
      });
  },
});

export const selectTasks = (state) => state.tasks.tasks;

export default tasksSlice.reducer;
