import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/UserContext";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { HiMenuAlt1 } from "react-icons/hi";

const links = [
  {
    name: "Home",
    path: "/",
    isAuthenticated: true,
  },
  {
    name: "Login",
    isAuthenticated: false,
    path: "/login",
  },
  {
    name: "Register",
    isAuthenticated: false,
    path: "/signup",
  },
  {
    name: "Feed",
    isAuthenticated: true,
    path: "/feed",
  },
  {
    name: "Add Post",
    isAuthenticated: true,
    path: "/add_post",
  },
];

export default function SideBar({ logOut }) {
  const [open, setOpen] = useState(false);
  const [linksArr, setLinksArr] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    const isAuthenticatedLinks = links.filter(
      (link) => link.isAuthenticated === true
    );
    const isNotAuthenticatedLinks = links.filter(
      (link) => link.isAuthenticated === false
    );

    setLinksArr(user !== null ? isAuthenticatedLinks : isNotAuthenticatedLinks);
  }, [user]);

  return (
    <Dropdown>
      <DropdownTrigger className="text-2xl">
        <Button
          onClick={() => setOpen(!open)}
          className="text-[2rem]"
          variant="ghost"
        >
          <HiMenuAlt1 />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {linksArr.map((item) => (
          <DropdownItem key={item.name} className="border-none">
            <Link to={item.path} className="text-black">
              {item.name}
            </Link>
          </DropdownItem>
        ))}
        {user !== null && (
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            onClick={() => {
              logOut();
              setLinksArr(
                links.filter((link) => link.isAuthenticated === false)
              );
            }}
          >
            Log out
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
