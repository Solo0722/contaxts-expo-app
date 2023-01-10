import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Center,
  Image,
  Button,
  FormControl,
  Input,
  Heading,
  Box,
  VStack,
  HStack,
  Link,
} from "native-base";
import { SIGNUP } from "../../constants/routeNames";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.loginContainer}>
      <View>
        <Image
          source={require("../../assets/images/logo.png")}
          alt="Logo"
          size="xl"
          style={styles.logo}
        />
      </View>
      <Box safeArea w="100%">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          textAlign="center"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          mb="1"
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
          textAlign="center"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Username</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forgot Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo">
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => navigate(SIGNUP)}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: "#fff",

    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 180,
    width: 180,
  },
});
