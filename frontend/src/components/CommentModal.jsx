import { useEffect, useState, useContext } from "react";

import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
} from "@nextui-org/react";
import useSinglePost from "../Custom Hooks/useSinglePost";

import { useCookies } from "react-cookie";
import { handleComment } from "../utility/post.utility";
import { commentContext } from "../Context/CommentContext";

const CommentModal = ({ id, onClose }) => {
  const { post } = useSinglePost({ id });
  const { comments, setComments } = useContext(commentContext);
  const [cookies, _] = useCookies([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setComments(post?.comments);
  }, [post]);

  const submitComment = async () => {
    try {
      let comment = commentText.trim();
      const response = await handleComment(post._id, comment, cookies?.uid);
      setComments(response.comments);
      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1 text-black">
        Comments
      </ModalHeader>
      <ModalBody className="text-black w-full">
        {/* <Avatar src={post?.userId.profilePic} className="w-6 h-6 text-tiny"  /> */}
        <div className="flex flex-row gap-2 justify-start">
          <Avatar src={post?.userId.profilePic} size="sm" />
          <span
            className="sm:text-[14px] text-sm w-[240px] "
            style={{ width: "230px", fontSize: "0.8rem" }}
          >
            <b className=" text-base font-bold">{post?.userId.username}</b>{" "}
            {post?.postText}
          </span>
        </div>

        {comments &&
          comments.length > 0 &&
          comments.map((item) => (
            <div key={item._id} className="flex flex-row gap-2 justify-start">
              <Avatar src={item?.userId.profilePic} size="sm" />
              <span
                className="sm:text-[14px] text-sm w-[240px] break-words "
                style={{ width: "230px", fontSize: "0.8rem" }}
              >
                <b className=" text-base font-bold">{item?.userId.username}</b>{" "}
                {item?.commentText}
              </span>
            </div>
          ))}
      </ModalBody>
      <ModalFooter>
        <div className="">
          <input
            type="text"
            className=" detail"
            placeholder="Add Comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />

          <div className="flex">
            <Button
              color="primary"
              className="text-white btn int"
              radius="full"
              onPress={submitComment}
            >
              Comment
            </Button>
          </div>
        </div>
      </ModalFooter>
    </>
  );
};

export default CommentModal;
