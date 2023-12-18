import axios from "axios";

const auth_url = String(import.meta.env.VITE_AUTH_URI);

// Create an instance of axios
let ApiService = axios.create({
  baseURL: auth_url,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export const loginUser = async (username, password) => {
  try {
    const response = await ApiService.post("/login", {
      username: username.toLowerCase(),
      password,
    });

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

    const response = await ApiService.post("/create", formData, {
      withCredentials: true,
    });
    await loginUser(userData.username, userData.password);

    // Handle success, e.g., redirect to the login page
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error.response?.data || error.message || "An error occurred";
  }
};

export const updateUser = async (formData) => {
  try {
    const response = await ApiService.post("/update", formData, {
      withCredentials: true,
    });
    // loginUser(response);
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const getProfile = async () => {
  try {
    const response = await ApiService.get("/profile");

    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const logoutuser = await ApiService.get("/logout", {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};
