import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
import AuthNavigator from "./AuthNavigator";
import { useContext } from "react";
import { GlobalContext } from "../context/context";

const AppNavigation = () => {
  const { currentUser } = useContext(GlobalContext);

  return (
    <NavigationContainer>
      {currentUser !== null ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigation;
