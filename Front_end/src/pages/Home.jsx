import React, { useState, useEffect } from "react";
import { selectUser } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  addTaskAsync,
  deleteTaskAsync,
  editTaskAsync,
  fetchUserTaskAsync,
} from "../features/task/taskSlice";
import { selectTasks } from "../features/task/taskSlice";
import Navbar from "../features/navbar/navbar";
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const user = useSelector(selectUser);
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState("");
  let token = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  // console.log(tasks);
  // console.log(user);

  useEffect(() => {
    dispatch(fetchUserTaskAsync({ token }));
  }, [dispatch]);

  // console.log(tasks);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = async () => {
    if (edit) {
      await dispatch(editTaskAsync({ task: { task: inputValue }, id: editID }));
      setEdit(false);
      setInputValue("");
    } else {
      await dispatch(addTaskAsync({ task: inputValue }));
    }

    // Refresh the task list after adding or editing
    dispatch(fetchUserTaskAsync({ token }));
  };

  const handleEditItem = (task, id) => {
    setEditID(id);
    setInputValue(task);
    setEdit(true);
  };

  const handleDeleteItem = async (id) => {
    await dispatch(deleteTaskAsync(id));

    dispatch(fetchUserTaskAsync({ token }));
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter item name"
            className="border p-2 mr-2"
          />
          <button
            className={`${
              edit ? "bg-yellow-500" : "bg-blue-500"
            } text-white px-4 py-2`}
            onClick={handleAddItem}
          >
            {edit ? "Edit TASK" : "Add TASK"}
          </button>
        </div>
        <ul>
          {tasks.map((item, index) => (
            <li key={item.id} className="mb-4">
              {item.task}
              <button
                className="ml-2 bg-green-500 text-white px-2 py-1"
                onClick={() => handleEditItem(item.task, item._id)}
              >
                Edit
              </button>
              <button
                className="ml-2 bg-red-500 text-white px-2 py-1"
                onClick={() => handleDeleteItem(item._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
