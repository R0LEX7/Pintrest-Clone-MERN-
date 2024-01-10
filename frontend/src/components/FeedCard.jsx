import { useState, useEffect, useCallback } from "react";
import "../stylesheets/feed.css";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../utility/authentication.utility";
import { handleLike } from "../utility/post.utility";
import { io } from "socket.io-client";
import { useCookies } from "react-cookie";
import { Card, CardFooter, Image, Button, Avatar } from "@nextui-org/react";
import { Modal, useDisclosure, ModalContent } from "@nextui-org/react";
import { FaRegComment } from "react-icons/fa6";
import CommentModal from "./CommentModal";
import DeletePost from "./DeletePost";

const FeedCard = ({ props }) => {
  const [user, setUser] = useState(null);
  const [likeArr, setLikeArr] = useState(props.likes);
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [cookies, _] = useCookies([]);
  const fetchUser = useCallback(async () => {
    try {
      const data = await getProfile(cookies?.uid);
      setUser(data.user);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleClick = async () => {
    try {
      if (user) {
        const updatedLikeArray = await handleLike(props._id, cookies?.uid);
        setLikeArr(updatedLikeArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="gallery-item relative">
      <Card
        isPressable
        isFooterBlurred
        onPress={handleClick}
        radius="md"
        className="border-none relative"
        maxWidth="full"
      >
        <Image
          alt="Woman listing to music"
          className="object-cover"
          // height={200}
          src={props?.image}

          // width={200}
        />

        <Avatar
          className="absolute top-1 left-2 z-10 mt-1 w-6 h-6 text-tiny"
          src={props?.userId.profilePic}
        />
        {user?._id === props?.userId._id && <DeletePost post={props} />}
        <CardFooter
          className="h-8  justify-between  w-full flex-row before:bg-white/30 border-white/20 border-1 overflow-hidden py-1 absolute  bottom-0 mb-0 mx-1
       shadow-small ml-1 z-10"
        >
          <p className="text-tiny text-white truncate">
            <span className="font-bold truncate">{props?.userId.username}</span>{" "}
            : {props?.postText}
          </p>

          <div className="flex flex-row ">
            <Button
              className="text-tiny text-white bg-black/20 p-0 min-w-unit-8"
              variant="flat"
              color="default"
              radius="lg"
              size="sm"
              onClick={handleClick}
            >
              {likeArr.includes(user?.username) ? <GoHeartFill /> : <GoHeart />}
              {likeArr.length > 0 && likeArr.length}
            </Button>
            <Button
              onPress={onOpen}
              className="text-tiny text-white bg-black/20   min-w-unit-6"
              variant="flat"
              color="default"
              radius="lg"
              size="sm"
            >
              <FaRegComment />{" "}
              {props?.comments.length > 0 && props?.comments.length}
            </Button>
            <Modal
              backdrop="blur"
              size="xs"
              placement="center"
              scrollBehavior="inside"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            >
              <ModalContent className="text-black">
                {(onClose) => <CommentModal id={props._id} onClose={onClose} />}
              </ModalContent>
            </Modal>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FeedCard;
