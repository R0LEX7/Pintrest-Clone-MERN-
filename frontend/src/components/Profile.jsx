import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../stylesheets/profile.css";
import { MdEdit } from "react-icons/md";

const dummyImg =
  "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?w=740";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:2000/user/profile", {
          withCredentials: true,
        });
        console.log(response.data);
        setUser(response.data?.user);
      } catch (error) {
        console.log("error", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  console.log(user);
  return (
    <div className="card">
      <div className="img">
        <img src={user?.profilePic || dummyImg} className="profilePic" />
        <Link className="edit-icon" to="/update_user">
          <MdEdit />
        </Link>
      </div>
      <div className="infos">
        <div className="name">
          <h2>{user?.fullName}</h2>
          <h4>@{user?.username}</h4>
        </div>

        <div className="stats">
          <h3>
            {user?.posts.length} <br></br> <span>Posts</span>
          </h3>
          <h3>
            1.3M <br></br> <span>Posts</span>
          </h3>
          <h3>
            1.3M <br></br> <span>Posts</span>
          </h3>
        </div>
        <div className="links">
          <button className="follow">Follow</button>
          {/* <button className="view">View profile</button> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
