import { handleDownload } from "../utility/post.utility";

import { MdSaveAlt } from "react-icons/md";

const DownloadPost = ({ post }) => {
  return (
    <div>
      <button
        onClick={() => handleDownload(post)}
        className="absolute top-1 right-1 text-white bg-black int  btn px-1 z-10 mt-1 w-6 h-6 text-lg"
        style={{
          backgroundColor: "black",
        }}
      >
        <MdSaveAlt />
      </button>
    </div>
  );
};

export default DownloadPost;
