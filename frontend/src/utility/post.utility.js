import axios from "axios";
import { getProfile } from "./authentication.utility";

const backendUri = String(import.meta.env.VITE_URI);

// import axios from "axios";

let ApiService = axios.create({
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

export const getData = async (token) => {
  try {
    const response = await ApiService.get("/post/all_posts", {
      headers: { authorization: token },
    });
    return response?.data?.posts || null;
  } catch (error) {
    console.error(error);
    throw error?.response?.data?.message || error.message;
  }
};

export const handleLike = async (postId, token) => {
  try {
    const response = await ApiService.post(
      "/post/like",
      { postId },
      {
        headers: { authorization: token },
      }
    );
    console.log("api called");
    return response?.data.likeArray;
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data?.message);
    throw error;
  }
};

export const handleComment = async (postId, comment, token) => {
  try {
    let text = comment.trim();
    if (text.length === 0) throw new Error("Please enter a comment");
    const response = await ApiService.post(
      "/post/comment",
      { postId, text },
      {
        headers: { authorization: token },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data?.message);
    throw error;
  }
};

export const getSinglePost = async (id, token) => {
  try {
    const response = await ApiService.get(
      "/post/get_post",
      {
        params: {
          id: id,
        },
      },
      {
        headers: { authorization: token },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (postId, token) => {
  try {
    const response = await ApiService.delete(`/post/delete/${postId}`, {
      headers: { authorization: token },
    });
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const createPost = async (formData, token) => {
  try {
    const response = await ApiService.post("/post/create", formData, {
      ...configFile,
      headers: { ...configFile.headers, authorization: token },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error.response.data.message;
  }
};
