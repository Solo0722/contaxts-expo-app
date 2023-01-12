import React, { createContext } from "react";
import { useCustomAsyncStorage } from "../helpers/hooks/useCustomAsyncStorage";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useCustomAsyncStorage(
    "loggedInUser",
    null
  );

  return (
    <GlobalContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
