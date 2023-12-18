
import FeedCard from "./FeedCard";
import UserComponent from "./UserComponent";
import { useAuth } from "../Context/UserContext";
import Loader from "./Loader/Loader";

const Profile = () => {
  const {user , loading} = useAuth();

  
  return (
    <>
      {loading ? (<Loader/>) : (
        <>
        {user && (
          <>
          <UserComponent user={user}/>
        <div className="gallery">
          {user.posts.length > 0 &&
            user.posts.map((item) => <FeedCard key={item?._id} props={item} />)}
        </div>
          </>
        )}
        </>
      )}
    </>
  );
};

export default Profile;
