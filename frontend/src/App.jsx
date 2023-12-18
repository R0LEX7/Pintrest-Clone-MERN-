
import { Header, Login } from "./index.js";
import { Outlet } from "react-router-dom";
import {AuthProvider} from "./Context/UserContext.jsx";
import useUserProfile from "./Custom Hooks/useUserProfile.jsx";
import {User} from "@nextui-org/react";
import SingleCard from "./components/SingleCard.jsx";
import {toast , Toaster} from "react-hot-toast"




const App = () => {
  const { loading, error, user } = useUserProfile();


  

  return (
    <>
    <Toaster/>
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
