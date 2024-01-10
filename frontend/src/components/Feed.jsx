import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "react-masonry-css";
import "../stylesheets/feed.css";
import FeedCard from "./FeedCard";
import { useCookies } from "react-cookie";

import { getData } from "../utility/post.utility.js";

const breakPointColumnObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [cookies] = useCookies([]);

  const getAllPosts = async () => {
    try {
      const AllPosts = await getData(cookies?.uid);
      setPosts(AllPosts);
    } catch (error) {
      console.log(error);
      toast(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="gallery">
      <Toaster />
      {posts.length > 0 &&
        posts.map((item) => <FeedCard key={item?._id} props={item} />)}
    </div>
  );
};

export default Feed;
