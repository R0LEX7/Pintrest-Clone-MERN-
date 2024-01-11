import { useEffect, useState , useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import "react-masonry-css";
import "../stylesheets/feed.css";
import FeedCard from "./FeedCard";
import { useCookies } from "react-cookie";

import { getData } from "../utility/post.utility.js";
import Loader from "./Loader/Loader.jsx";



const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [cookies, _] = useCookies([]);
  const [loading, setLoading] = useState(false);

  const getAllPosts = useCallback(async () => {
    try {
      setLoading(true);
      const AllPosts = await getData(cookies?.uid);
      setPosts(AllPosts);
    } catch (error) {
      toast(error);
    } finally {
      setLoading(false);
    }
  }, [cookies?.uid]); // Include dependencies in the dependency array

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="gallery">
          <Toaster />
          {posts.length > 0 &&
            posts.map((item) => <FeedCard key={item?._id} props={item} />)}
        </div>
      )}
    </>
  );
};

export default Feed;
