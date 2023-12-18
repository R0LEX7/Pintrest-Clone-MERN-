import axios from "axios";
import { getProfile } from "./authentication.utility";

// const post_url = String(import.meta.env.VITE_AUTH_URI);

let ApiService = axios.create({
  baseURL: "https://pintrestclone-vqp3.onrender.com/post",
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

export const getData = async () => {
  try {
    const response = await ApiService.get("/all_posts");

    return response?.data?.posts || null;
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data?.message);
    throw error?.response?.data?.message || error.message;
  }
};

export const handleLike = async (postId) => {
  try {
    const response = await ApiService.post("/like", { postId });
    console.log("api called");
    return response?.data.likeArray;
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data?.message);
    throw error;
  }
};

export const handleComment = async (postId, comment) => {
  try {
    let text = comment.trim();
    if (text.length === 0) throw new Error("Please enter a comment");
    const response = await ApiService.post("/comment", { postId, text });
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data?.message);
    throw error;
  }
};

export const getSinglePost = async (id) => {
  try {
    const response = await ApiService.get("/get_post", {
      params: {
        id: id,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await ApiService.delete("/delete", {
      params: {
        postId,
      },
    });
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const createPost = async (formData) => {
  try {
    const response = await ApiService.post(
      "/create",
      formData,
      configFile
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error.response.data.message;
  }
};
