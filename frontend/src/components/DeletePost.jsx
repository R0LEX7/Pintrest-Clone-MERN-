import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalContent,
  Button,
} from "@nextui-org/react";
import { MdDeleteOutline } from "react-icons/md";
import { toast, Toaster } from "react-hot-toast";
import { deletePost } from "../utility/post.utility";
import { useNavigation } from "react-router-dom";
import { useAuth } from "../Context/UserContext";
import { useCookies } from "react-cookie";

const DeletePost = ({ post }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [cookies, _] = useCookies([]);
  const navigate = useNavigation();

  const { user } = useAuth();

  const handleDelete = async () => {
    if (user) {
      try {
        const response = await deletePost(post._id, cookies?.uid);
        console.log(response);
        toast.success(response.data.message);
        location.reload(true);
      } catch (error) {
        console.log(error);
        toast.error(error || "Server error");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Toaster />
      <button
        onClick={onOpen}
        className="absolute top-1 right-1 text-white bg-black int  btn px-1 z-10 mt-1 w-6 h-6 text-lg"
        style={{
          backgroundColor: "black",
        }}
      >
        <MdDeleteOutline />
      </button>
      <Modal
        backdrop="blur"
        size="xs"
        placement="center"
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="text-black">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                Delete Post
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you wanna delete this post?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  className="text-white btn int"
                  onPress={() => {
                    handleDelete();
                    onClose();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeletePost;
