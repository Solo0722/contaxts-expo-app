import { StyleSheet, Text, View, ScrollView } from "react-native";
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
import { LOGIN, SIGNUP } from "../../constants/routeNames";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";
import { client } from "../../helpers/sanity/sanityClient";
import { GlobalContext } from "../../context/context";

const Signup = () => {
  const { navigate } = useNavigation();
  const { updateUser } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const [signupFormData, setSignupFormData] = useState({
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e, name) => {
    setSignupFormData({
      ...signupFormData,
      [name]: e.trim(),
    });
  };

  const validate = () => {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,4}");
    if (!signupFormData.username) {
      setErrors({
        username: "Username is required",
      });
      return false;
    }
    if (signupFormData.username.length < 3) {
      setErrors({
        username: "Username must be at least 3 characters",
      });
      return false;
    }
    if (!signupFormData.firstName) {
      setErrors({
        firstName: "First name is required",
      });
      return false;
    }
    if (!signupFormData.lastName) {
      setErrors({
        lastName: "Last name is required",
      });
      return false;
    }
    if (!signupFormData.email) {
      setErrors({
        email: "Email is required",
      });
      return false;
    }
    if (regex.test(signupFormData.email) === false) {
      setErrors({
        email: "Email is not valid",
      });
      return false;
    }
    if (!signupFormData.password) {
      setErrors({
        password: "Password is required",
      });
      return false;
    }
    if (signupFormData.password.length < 6) {
      setErrors({
        ...errors,
        password: "Password must be at least 6 characters",
      });
      return false;
    }

    return true;
  };

  const submitSignupForm = () => {
    if (validate() == true) {
      setLoading(true);
      setErrors({});

      const doc = {
        _id: uuid.v4(),
        _type: "user",
        ...signupFormData,
        imageUrl: null,
        contacts: [],
      };

      client
        .createIfNotExists(doc)
        .then((result) => {
          setLoading(false);
          updateUser(result);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <ScrollView style={styles.signupContainer}>
      <View style={{ flex: 1 }}>
        <View style={styles.logoWrapper}>
          <Image
            source={require("../../assets/images/logo.png")}
            alt="Logo"
            size="xl"
            style={styles.logo}
          />
        </View>
        <Box safeArea w="100%" mb="60">
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
            Create a free acccount
          </Heading>

          <VStack space={3} mt="5">
            <FormControl isRequired isInvalid={"username" in errors}>
              <FormControl.Label>Username</FormControl.Label>
              <Input
                value={signupFormData.username}
                onChangeText={(e) => handleChange(e, "username")}
              />
              {"username" in errors && (
                <FormControl.ErrorMessage>
                  {errors.username}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={"firstName" in errors}>
              <FormControl.Label>First name</FormControl.Label>
              <Input
                value={signupFormData.firstName}
                onChangeText={(e) => handleChange(e, "firstName")}
              />
              {"firstName" in errors && (
                <FormControl.ErrorMessage>
                  {errors.firstName}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={"lastName" in errors}>
              <FormControl.Label>Last name</FormControl.Label>
              <Input
                value={signupFormData.lastName}
                onChangeText={(e) => handleChange(e, "lastName")}
              />
              {"lastName" in errors && (
                <FormControl.ErrorMessage>
                  {errors.lastName}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={"email" in errors}>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                keyboardType="email-address"
                value={signupFormData.email}
                onChangeText={(e) => handleChange(e, "email")}
              />
              {"email" in errors && (
                <FormControl.ErrorMessage>
                  {errors.email}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={"password" in errors}>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                value={signupFormData.password}
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
              onPress={submitSignupForm}
              mt="2"
              colorScheme="indigo"
            >
              Sign up
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Already have an account.
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                onPress={() => navigate(LOGIN)}
              >
                Sign in
              </Link>
            </HStack>
          </VStack>
        </Box>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  signupContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },

  logoWrapper: {
    width: "100%",
    marginVertical: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 180,
    width: 180,
  },
});
