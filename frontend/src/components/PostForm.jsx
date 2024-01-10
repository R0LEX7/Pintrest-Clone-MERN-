import { useState } from "react";
import "../stylesheets/postForm.css";
import "../stylesheets/login.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { createPost } from "../utility/post.utility";
import Loader from "./Loader/Loader";

const PostForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [picture, setPicture] = useState(null);
  const [postText, setPostText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cookies , _] = useCookies(["uid"]);

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
      setLoading(true);
      const formData = new FormData();

      formData.append("image", picture);
      formData.append("postText", postText);
      console.log(cookies)
      const response = await createPost(formData, cookies.uid);
      console.log(response);
      navigate("/feed");
      toast.success("Upload successful");
    } catch (error) {
      toast.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      {loading ? (
        <Loader />
      ) : (
        <div className="main">
          <div className="container ">
            <form className="content flex" encType="multipart/form-data">
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
                name="caption"
                onChange={(e) => setPostText(e.target.value)}
              ></input>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
                className="detail"
              ></input>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="selectedImage"
                />
              )}

              <button className="btn int" onClick={handleSubmit}>
                Post
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PostForm;
