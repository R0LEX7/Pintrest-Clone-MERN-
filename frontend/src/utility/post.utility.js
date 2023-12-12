import axios from "axios";

export const getData = async () => {
  try {
    const response = await axios.get("http://localhost:2000/post/all_posts", {
      withCredentials: true,
    });
    console.log(response);
    return response?.data?.posts || null;
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data?.message);
    throw error?.response?.data?.message || error.message;
  }
};

export const handleLike = async (postId) => {
  try {
    const response = await axios.post(
      "http://localhost:2000/post/like",
      { postId },
      { withCredentials: true }
    );
    return response?.data?.post;
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data?.message);
    throw error;
  }
};

export const handleComment = async (postId, text) => {
  try {
    const response = await axios.post(
      "http://localhost:2000/post/comment",
      { postId, text },
      { withCredentials: true }
    );
    return response?.data?.post;
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data?.message);
    throw error;
  }
};
