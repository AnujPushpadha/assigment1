const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

const AddTask = asyncHandler(async (req, res) => {
  const { task } = req.body;
  if (!task) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  console.log(req.user.id);
  const newTask = await Task.create({
    task,
    user_id: req.user.id, // req.user.id id of login user add this id to contact to have unique user to have unique contact
  });

  res.status(201).json(newTask);
});

const getAllTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

const getTaskBy_id = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  // const tasks = await Task.find({ user_id: req.params.id });
  const tasks = await Task.find({ user_id: req.user.id });
  if (!tasks) {
    res.status(404);
    throw new Error("task not found");
  }
  res.status(200).json(tasks);
});

const DeleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  console.log(task);
  if (!task) {
    res.status(404);
    throw new Error("tasknot found");
  }
  if (task.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user tasks");
  }
  await task.deleteOne({ _id: req.params.id });
  res.status(200).json(task);
});

const EditTask = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const task = await Task.findById(req.params.id);
  console.log(task);
  if (!task) {
    res.status(404);
    throw new Error("task not found");
  }

  if (task.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user tasks");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(task);
});

module.exports = {
  AddTask,
  getTaskBy_id,
  getAllTask,
  DeleteTask,
  EditTask,
};
