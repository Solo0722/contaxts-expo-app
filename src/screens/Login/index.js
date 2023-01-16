import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
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
import { client } from "../../helpers/sanity/sanityClient";
import { userQuery } from "../../helpers/sanity/sanityQueries";
import { GlobalContext } from "../../context/context";

const Login = () => {
  const { navigate } = useNavigation();
  const { updateUser } = useContext(GlobalContext);

  const [loginFormData, setLoginFormData] = useState({
    username: null,
    password: null,
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e, name) => {
    setLoginFormData({
      ...loginFormData,
      [name]: e,
    });
  };

  const validate = () => {
    if (!loginFormData.username) {
      setErrors({
        username: "Username is required",
      });
      return false;
    }
    if (!loginFormData.password) {
      setErrors({
        password: "Password is required",
      });

      return false;
    }

    return true;
  };

  const submitLoginForm = () => {
    if (validate() == true) {
      setLoading(true);
      setErrors({});
      const q = userQuery(
        loginFormData.username.trim(),
        loginFormData.password.trim()
      );
      client
        .fetch(q)
        .then((result) => {
          setLoading(false);
          updateUser(result[0]);
        })
        .catch((err) => console.log(err));
    }
  };

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
          <FormControl isInvalid={"username" in errors}>
            <FormControl.Label>Username</FormControl.Label>
            <Input onChangeText={(e) => handleChange(e, "username")} />
            {"username" in errors && (
              <FormControl.ErrorMessage>
                {errors.username}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={"password" in errors}>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              onChangeText={(e) => handleChange(e, "password")}
            />
            {"password" in errors && (
              <FormControl.ErrorMessage>
                {errors.password}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <Button
            isLoading={loading}
            onPress={submitLoginForm}
            mt="2"
            colorScheme="indigo"
          >
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
