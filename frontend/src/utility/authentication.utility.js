import axios from "axios";

const backendUri = String(import.meta.env.VITE_URI);

// Create an instance of axios
const ApiService = axios.create({
  baseURL: backendUri,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});
const configFile = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const loginUser = async (username, password) => {
  try {
    const response = await ApiService.post("/user/login", {
      username: username.toLowerCase(),
      password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
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

    await ApiService.post("/user/create", formData, configFile);
    const response = await loginUser(userData.username, userData.password);
    return response;
    // Handle success, e.g., redirect to the login page
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error.response?.data || error.message || "An error occurred";
  }
};

export const updateUser = async (formData, token) => {
  try {
    const response = await ApiService.post("/user/update", formData, {
      ...configFile,
      headers: { ...configFile.headers, authorization: token },
    });
    // loginUser(response);
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const getProfile = async (token) => {
  try {
    const response = await ApiService.get("/user/profile", {
      headers: { authorization: token },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
