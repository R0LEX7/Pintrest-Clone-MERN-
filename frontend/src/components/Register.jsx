import { useState } from "react";
import axios from "axios";
import "../stylesheets/login.css";
import { registerUser } from "../utility/authentication.utility";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader/Loader";
import { useCookies } from "react-cookie";

const Register = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });

  const [_, setCookie] = useCookies([]);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const response = await registerUser(userData, selectedImage);

      setCookie("uid", `Bearer ${response.token}`);
      navigate("/feed");
      toast.success(`Hii ${userData.username}`);
    } catch (error) {
      console.error("register failed:", error);
      toast.error(`Error :${error.error}`);
    } finally {
      setLoading(false);
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
      <Toaster />

      {loading ? (
        <Loader />
      ) : (
        <div className="main">
          <div className="container">
            <form className="content" encType="multipart/formdata">
              <div className="flex">
                <img
                  src="https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png"
                  alt="pin logo"
                  className="img1"
                />
                <p className="header">Register </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="detail"
              ></input>
              <input
                type="text"
                placeholder="Username"
                className="detail"
                value={userData.username}
                name="username"
                onChange={handleChange}
                required
              />
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
              <br />
              <input
                type="email"
                placeholder="Email"
                className="detail"
                value={userData.email}
                name="email"
                onChange={handleChange}
                required
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                className="detail"
                value={userData.password}
                name="password"
                onChange={handleChange}
                required
              />

              <button
                style={{ backgroundColor: "#f30d19" }}
                className="btn int "
                onClick={handleRegister}
              >
                Register
              </button>

              <footer>
                <p>
                  By continuing, you agree to Pinterest's
                  <b>Terms of Service, Privacy policy.</b>
                </p>
                <p>
                  Already on Pinterest? <Link to="/login">Log in</Link>
                </p>
              </footer>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
