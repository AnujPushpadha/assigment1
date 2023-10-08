export function createUser(userData) {
  // console.log(item);
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    console.log("data", { data });

    resolve({ data });
  });
}

export function loginUser(userData) {
  // console.log(item);
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    // console.log(response);
    const data = await response.json();
    // console.log("data", { data });
    // console.log(data.accessToken);
    localStorage.setItem("accessToken", data.accessToken);
    resolve({ data });
  });
}
