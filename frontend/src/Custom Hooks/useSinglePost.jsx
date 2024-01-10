import React, { useState, useEffect } from "react";
import { getSinglePost } from "../utility/post.utility";
import { useCookies } from "react-cookie";

const useSinglePost = ({ id }) => {
  const [post, setPost] = useState(null);
  const [cookies] = useCookies([]);

  useEffect(() => {
    getPost(id);
  }, []);

  const getPost = async (postId) => {
    try {
      const response = await getSinglePost(postId, cookies?.uid);
      setPost(response);
      setPost(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return { post, setPost };
};

export default useSinglePost;
