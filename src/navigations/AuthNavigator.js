import { Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LOGIN, SIGNUP } from "../constants/routeNames";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

const AuthNavigator = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={LOGIN}
    >
      <AuthStack.Screen name={LOGIN} component={Login} />
      <AuthStack.Screen name={SIGNUP} component={Signup} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
