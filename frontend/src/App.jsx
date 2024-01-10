import { Header, Login } from "./index.js";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./Context/UserContext.jsx";
import useUserProfile from "./Custom Hooks/useUserProfile.jsx";
import { User } from "@nextui-org/react";
import SingleCard from "./components/SingleCard.jsx";
import { toast, Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const App = () => {
  const { loading, error, user } = useUserProfile();
  const [cookies, _] = useCookies([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.uid) {
      navigate("/feed");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Toaster />
      <AuthProvider>
        <Header />
        <main>
          <Outlet />
        </main>
      </AuthProvider>
    </>
  );
};

export default App;
