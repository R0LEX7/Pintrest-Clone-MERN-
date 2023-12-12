import { useState } from "react";
import "../stylesheets/Login.css";
import { updateUser } from "../utility/authentication.utility";
import { Link, useNavigate } from "react-router-dom";
const UpdateProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    fullName: "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("fullName", userData.fullName);
      formData.append("username", userData.username);
      formData.append("updateProfilePic", selectedImage);

      console.log(formData);
      await updateUser(formData);
      //   navigate("/profile");
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
          <form
            action="submit"
            onSubmit={handleUpdate}
            className="content flex"
            encType="multipart/form-data"
          >
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
              name="updateProfilePic"
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

            <h4>Forgot your password?</h4>

            <button type="submit" className="btn int">
              Update Profile
            </button>
          </form>
          <footer>
            <p>
              By continuing, you agree to Pinterest's
              <b>Terms of Service, Privacy policy.</b>
            </p>
            <hr />
            <p>
              Don't want to update? <Link to="/feed">Cancel</Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};
3;

export default UpdateProfile;
