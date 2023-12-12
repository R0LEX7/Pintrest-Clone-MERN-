import { useState } from "react";
import axios from "axios";
import "../stylesheets/Login.css";
import { registerUser } from "../utility/authentication.utility";
import { Link , useNavigate } from "react-router-dom";

const Register = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });

  const handleRegister = async () => {
    try {
      await registerUser(userData, selectedImage);
      navigate("/feed")
    } catch (error) {
      console.error("Login failed:", error);
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
    <div className="main">
      <div className="container">
        <div className="content">
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
          />
          <br />
          <input
            type="text"
            placeholder="Fullname"
            className="detail"
            value={userData.fullName}
            name="fullName"
            onChange={handleChange}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            className="detail"
            value={userData.email}
            name="email"
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            className="detail"
            value={userData.password}
            name="password"
            onChange={handleChange}
          />

          <h4>Forgot your password?</h4>

          <button className="btn int" onClick={handleRegister}>
            Register
          </button>
          {/* <p className="or">OR</p>
          <button className="btn fbk">
            <i
              className="fab fa-facebook fa-lg"
              style={{ color: "white", paddingRight: "10px" }} // <-- Correct usage of style prop
            ></i>
            <a href="#">Continue with Facebook</a>
          </button>
          <br />
          <button className="btn ggl">
            <i
              className="fab fa-google"
              style={{ color: "rgb(11, 241, 22)", paddingRight: "10px" }} // <-- Correct usage of style prop
            ></i>
            <a href="#">Continue with Google</a>
          </button> */}

          <footer>
            <p>
              By continuing, you agree to Pinterest's
              <b>Terms of Service, Privacy policy.</b>
            </p>
            <hr />
            <p>
              Already on Pinterest? <Link to="/login">Log in</Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Register;