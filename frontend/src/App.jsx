import { useEffect, useState, createContext } from "react";
import { Header, Login } from "./index.js";
import { Outlet } from "react-router-dom";
import userContext from "./Context/user.context.js";

import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      <userContext.Provider value={{ user, setUser }}>
        <Header />
        {user && <h1>{user.username}</h1>}
      {/* {!authenticated && <Login />} */}
        <main>
          <Outlet />
        </main>
      </userContext.Provider>
    </>
  );
};

export default App;