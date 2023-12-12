import React, { useState } from "react";
import "../stylesheets/postForm.css";
import "../stylesheets/Login.css";
import axios from "axios";

const PostForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [picture, setPicture] = useState(null);
  const [postText, setPostText] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPicture(file);
      setSelectedImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("image", picture);
      formData.append("postText", postText);

      const response = await axios.post(
        "http://localhost:2000/post/create",
        formData,
        {
          withCredentials: true,
        }
      );

      // Handle the response, update UI, etc.
      console.log("Upload successful", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error uploading file", error);
    }
  };

  return (
    <div className="main">
      <div className="container ">
        <form
          
          onSubmit={handleSubmit}
          className="content flex"
          encType="multipart/form-data"
        >
          <img
            src="https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png"
            alt="pin logo"
            className="img1"
          />
          <p className="header">Share Your Idea..</p>
          <input
            type="text"
            className="detail"
            placeholder="Type your idea here.."
            name="file"
            onChange={(e) => setPostText(e.target.value)}
          ></input>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="detail"
          ></input>
          {selectedImage && (
            <img src={selectedImage} alt="Selected" className="selectedImage" />
          )}

          <button type="submit" className="btn int">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;