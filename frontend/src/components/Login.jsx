import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth } from "../Context/UserContext";
import { loginUser } from "../utility/authentication.utility";
import "../stylesheets/Login.css";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Loader from "./Loader/Loader";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setError, setLoading  , loading} = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await loginUser(username, password);
      setUser(response.user);
      toast.success(`Hii ${username}`)
      navigate("/feed");
    } catch (error) {
      setError("Invalid username or password"); // Display a meaningful error message
      console.error("Login failed:", error);
      toast.error(`Error :${error}`)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (<Loader/>) : (
        <div className="main">
        <Toaster/>
          <div className="container">
            <div className="content flex">
              <img
                src="https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png"
                alt="pin logo"
                className="img1"
              />
              <p className="header">Log in to see more</p>
  
              <input
                type="text"
                placeholder="Username"
                className="detail"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                className="detail"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
  
              <h4>Forgot your password?</h4>
  
              <button className="btn int" onClick={handleLogin}>
                Log in
              </button>
  
              <footer>
                <p>
                  By continuing, you agree to Pinterest's
                  <b>Terms of Service, Privacy policy.</b>
                </p>
                <hr />
                <p>
                  Not on Pinterest yet? <Link to="/signup">Register</Link>
                </p>
              </footer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
