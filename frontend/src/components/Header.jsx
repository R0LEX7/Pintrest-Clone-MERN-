import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../stylesheets/header.css";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const logoutuser = await axios.get("http://localhost:2000/user/logout", {
        withCredentials: true,
      });
      console.log("logoutingggg" + logoutuser);
      navigate("/login");
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  return (
    <header>
      <nav className={`menu--left `} role="navigation">
        <div className="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul className="menuItem">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/feed">feed</Link>
            </li>
            <li>
              <Link to="/add_post">Add</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li onClick={handleLogout}>logout</li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
