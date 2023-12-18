import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Feed,
  Home,
  Login,
  PostForm,
  Profile,
  Register,
  UpdateProfile,
} from "./index.js";
import "./index.css";
import SingleCard from "./components/SingleCard.jsx";
import { CommentProvider } from "./Context/CommentContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Feed />,
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
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/add_post",
        element: <PostForm />,
      },
      {
        path: "/update_user",
        element: <UpdateProfile />,
      },
      {
        path: "/post/:id",
        element: <SingleCard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CommentProvider>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </CommentProvider>
  </React.StrictMode>
);
