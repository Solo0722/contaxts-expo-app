import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const { getItem, setItem, removeItem } = useAsyncStorage("currentUser");
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    const user = await getItem();
    const jsonUser = user !== null ? JSON.parse(user) : null;
    setCurrentUser(jsonUser);
  };

  const updateUser = async (data) => {
    const jsonUser = JSON.stringify(data);
    await setItem(jsonUser);
    setCurrentUser(data);
  };

  const removeUser = async () => {
    await removeItem();
    setCurrentUser(null);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        fetchCurrentUser,
        updateUser,
        removeUser,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
