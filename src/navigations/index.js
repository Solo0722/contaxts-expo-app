import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
import AuthNavigator from "./AuthNavigator";
import { useContext } from "react";
import { GlobalContext } from "../context/context";

const AppNavigation = () => {
  const { loggedInUser } = useContext(GlobalContext);

  return (
    <NavigationContainer>
      {loggedInUser ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigation;
