import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Feed, Home, Login, PostForm, Profile, Register, UpdateProfile } from "./index.js";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        // element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/feed",
        element: <Feed />,
      },{
        path: "/profile",
        element: <Profile/>
      },{
        path: "/add_post",
        element : <PostForm/>
      }
      ,{
        path: "/update_user",
        element : <UpdateProfile/>
      }
    ],
  },
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);