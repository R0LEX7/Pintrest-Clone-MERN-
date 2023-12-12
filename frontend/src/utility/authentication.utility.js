import axios from "axios";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      "http://localhost:2000/user/login",
      {
        username: username.toLowerCase(),
        password,
      },
      {
        withCredentials: true,
      }
    );

    console.log(response.data); // Handle success, e.g., redirect to profile page
    localStorage.setItem("uid", JSON.stringify(response.data?.user?._id));
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const registerUser = async (userData, selectedImage) => {
  try {
    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("fullName", userData.fullName);
    formData.append("password", userData.password);
    formData.append("profilePic", selectedImage);

    const response = await axios.post(
      "http://localhost:2000/user/create",
      formData,
      {
        withCredentials: true,
      }
    );
    loginUser(userData.username, userData.password);

    console.log(response.data); // Handle success, e.g., redirect to login page
  } catch (error) {
    console.error(error.response?.data || error.message); // Handle error, e.g., display error message
  }
};

export const updateUser = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:2000/user/update",
      formData,

      {
        withCredentials: true,
      }
    );
    // loginUser(response);
    console.log(response.data);
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};
