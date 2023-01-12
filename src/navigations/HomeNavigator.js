import { Text, View } from "react-native";
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  CONTACT_DETAIL,
  CONTACT_LIST,
  CREATE_CONTACT,
  SETTINGS,
} from "../constants/routeNames";
import Contacts from "../screens/Contacts";
import ContactDetail from "../screens/ContactDetail";
import CreateContact from "../screens/CreateContact";
import Settings from "../screens/Settings";
import { Icon, Avatar, Pressable } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileModal from "../components/ProfileModal";
import { GlobalContext } from "../context/context";

const HomeNavigator = ({ navigation }) => {
  const HomeStack = createStackNavigator();

  const [profileModalVisible, setProfileModalVisible] = React.useState(false);
  const { loggedInUser } = useContext(GlobalContext);

  return (
    <HomeStack.Navigator
      initialRouteName={CONTACT_LIST}
      screenOptions={{
        headerShadowVisible: true,
        headerStyle: {
          shadowOpacity: 1,
          shadowColor: "rgba(0,0,0,0.7)",
        },
      }}
    >
      <HomeStack.Screen
        name={CONTACT_LIST}
        component={Contacts}
        options={{
          headerTitleAlign: "center",
          headerLeft: () => (
            <Icon
              as={Ionicons}
              name="menu-outline"
              size="xl"
              paddingLeft={"8px"}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerRight: () => (
            <>
              <Pressable onPress={() => setProfileModalVisible(true)}>
                <Avatar
                  bg="indigo.500"
                  size="sm"
                  marginRight={"8px"}
                  source={{ uri: loggedInUser.image }}
                >
                  {loggedInUser ? loggedInUser.username.slice(0, 1) : "C"}
                </Avatar>
              </Pressable>
              <ProfileModal
                profileModalVisible={profileModalVisible}
                setProfileModalVisible={setProfileModalVisible}
              />
            </>
          ),
        }}
      />
      <HomeStack.Screen name={CONTACT_DETAIL} component={ContactDetail} />
      <HomeStack.Screen name={CREATE_CONTACT} component={CreateContact} />
      <HomeStack.Screen name={SETTINGS} component={Settings} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
