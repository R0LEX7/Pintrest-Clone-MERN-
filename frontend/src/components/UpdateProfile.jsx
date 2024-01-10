import { useState } from "react";
import "../stylesheets/Login.css";
import { updateUser } from "../utility/authentication.utility";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Loader from "./Loader/Loader";
import {useCookies} from 'react-cookie'

const UpdateProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['uid']);

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    fullName: "",
  });


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("fullName", userData.fullName);
      formData.append("username", userData.username);
      formData.append("updateProfilePic", selectedImage);

      console.log(formData);
      await updateUser(formData , cookies?.uid);

      toast.success("Profile updated");
    } catch (error) {
      console.error(error);
      toast.error("Error in updating profile");
    } finally {
      setLoading(false);
      navigate("/profile");
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="main">
          <Toaster />
          <div className="container">
            <div className="content">
              <div className="flex">
                <img
                  src="https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png"
                  alt="pin logo"
                  className="img1"
                />
                <p className="header">Update Profile </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="detail"
              ></input>
              <br />
              <input
                type="text"
                placeholder="Fullname"
                className="detail"
                value={userData.fullName}
                name="fullName"
                onChange={handleChange}
                required
              />

              <button
                style={{ backgroundColor: "#f30d19" }}
                className="btn int "
                onClick={handleUpdate}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
