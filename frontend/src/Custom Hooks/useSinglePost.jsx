import React, { useState, useEffect } from "react";
import { getSinglePost } from "../utility/post.utility";

const useSinglePost = ({id}) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost(id);
  }, []);

  const getPost = async (postId) => {
    try {
        const response = await getSinglePost(postId);
        setPost(response);
        setPost(response.data.data)
      } catch (error) {
        console.log(error);
      }
  }
  return { post, setPost };
};

export default useSinglePost;
