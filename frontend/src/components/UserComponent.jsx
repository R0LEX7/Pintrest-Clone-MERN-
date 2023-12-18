import React from 'react'
import {Card, CardHeader, CardBody,Image , CardFooter, Avatar, Button} from "@nextui-org/react";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import "../stylesheets/profile.css"


const dummyImg =
  "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?w=740";

const UserComponent = ({user}) => {
   
  return (
   <div className="flex ">
     <div className="card text-black ">
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
          1.3M <br></br> <span>Follower</span>
        </h3>
        <h3>
          1.3M <br></br> <span>Following</span>
        </h3>
      </div>
      <div className="links">
        <button className="follow"> <Link to="/add_post">Add Post</Link></button>
        {/* <button className="view">View profile</button> */}
      </div>
    </div>
  </div>
   </div>
  )
}

export default UserComponent