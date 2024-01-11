
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/UserContext";
import {
  Navbar,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import "../stylesheets/header.css";

import SideBar from "./SideBar";


const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [_ ,removeCookie] = useCookies([]);

  const handleLogout = async () => {
    try {
      removeCookie("uid");
      toast.success("logout successfully");
      navigate("/login");
      setUser(null);
    } catch (error) {
      console.log(error);
      toast.error("logout failed");
      navigate("/login");
    }
  };

  return (
    <Navbar maxWidth="full" className="lg:px-4 gap-8 shadow-md justify-between">

      <NavbarContent>
        <NavbarContent>
          <SideBar propUser={user} logOut={handleLogout} />
        </NavbarContent>
      </NavbarContent>
      <NavbarContent justify="end">
        {user && (
          <Dropdown placement="bottom-end" className="text-black">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform rounded-full"
                name={user?.username}
                size="md"
                src={user?.profilePic}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold border-none">Signed in as</p>
                <p className="font-semibold">{user?.username}</p>
              </DropdownItem>

              <DropdownItem key="settings">
                <Link to="/profile">My Profile</Link>
              </DropdownItem>

              <DropdownItem key="team_settings">
                <Link to="/update_user">Update Profile</Link>
              </DropdownItem>
              <DropdownItem key="analytics">
                <Link to="/profile">My Pins</Link>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
