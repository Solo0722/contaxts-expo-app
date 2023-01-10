import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { HOME_NAVIGATOR, LOGIN, SETTINGS } from "../constants/routeNames";
import HomeNavigator from "./HomeNavigator";
import { Center, Image, VStack, Button, Icon, AlertDialog } from "native-base";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const DrawerContainer = ({ navigation }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  return (
    <SafeAreaView>
      <View style={styles.drawerWrapper}>
        <View style={styles.logoWrapper}>
          <Image
            source={require("../assets/images/logo.png")}
            alt="Logo"
            size="xl"
            style={styles.logo}
          />
        </View>
        <View>
          <VStack space={3} mt="5">
            <Button
              width={"100%"}
              variant="ghost"
              colorScheme="black"
              leftIcon={
                <Icon as={Ionicons} name="person-circle-outline" size="sm" />
              }
              onPress={() => navigation.navigate(SETTINGS)}
            >
              Profile
            </Button>
            <Button
              width={"100%"}
              variant="ghost"
              colorScheme="black"
              leftIcon={
                <Icon as={Ionicons} name="settings-outline" size="sm" />
              }
              onPress={() => navigation.navigate(SETTINGS)}
            >
              Settings
            </Button>
            <Button
              width={"100%"}
              variant="ghost"
              colorScheme="black"
              leftIcon={<Icon as={Ionicons} name="log-out-outline" size="sm" />}
              onPress={() => {
                navigation.toggleDrawer();
                setIsOpen(!isOpen);
              }}
            >
              Log out
            </Button>
          </VStack>
        </View>
      </View>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Log out</AlertDialog.Header>
          <AlertDialog.Body>
            You will be logged out from this application. This action is
            irreversible.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={onClose}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </SafeAreaView>
  );
};

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={({ navigation }) => (
        <DrawerContainer navigation={navigation} />
      )}
    >
      <Drawer.Screen name={HOME_NAVIGATOR} component={HomeNavigator} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerWrapper: {
    padding: 10,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrapper: {
    marginVertical: 20,
  },
  logo: {
    height: 150,
    width: 150,
  },
});

export default DrawerNavigator;
