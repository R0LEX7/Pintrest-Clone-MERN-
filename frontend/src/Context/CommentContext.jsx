import { Children, createContext, useContext, useState } from "react";

const commentContext = createContext([]);

const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  return (
    <commentContext.Provider value={{ comments, setComments }}>
      {children}
    </commentContext.Provider>
  );
};

export {CommentProvider , commentContext}


