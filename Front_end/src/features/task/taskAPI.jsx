import axios from "axios";
let token = localStorage.getItem("accessToken");
export function fetchUserTasks(token) {
  return new Promise(async (resolve) => {
    // console.log(token.token);
    //TODO: we will not hard-code server URL here
    const response = await axios.get("http://localhost:3000/api/task", {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    const data = await response.data;
    // console.log(data);
    resolve({ data });
  });
}

export function addTasks(taskData) {
  return new Promise(async (resolve) => {
    console.log(token);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/task/add",
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.data;
      console.log(responseData);

      resolve({ data: responseData });
    } catch (error) {
      console.error("Error adding tasks:", error.message);
      resolve({ error: "Failed to add tasks" });
    }
  });
}

export function deleteTasks(id) {
  return new Promise(async (resolve) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/task/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.data;
      console.log(responseData);

      resolve({ data: responseData });
    } catch (error) {
      console.error("Error deleting tasks:", error.message);
      resolve({ error: "Failed to delete tasks" });
    }
  });
}

export function editTasks(id, data) {
  return new Promise(async (resolve) => {
    console.log(id, data);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/task/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.data;
      console.log(responseData);

      resolve({ data: responseData });
    } catch (error) {
      console.error("Error deleting tasks:", error.message);
      resolve({ error: "Failed to delete tasks" });
    }
  });
}
