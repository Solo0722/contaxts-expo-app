import { StyleSheet, Text, View, ScrollView } from "react-native";
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
import { LOGIN, SIGNUP } from "../../constants/routeNames";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const { navigate } = useNavigation();

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
            <FormControl>
              <FormControl.Label>Username</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>First name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Last name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input type="email" />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
            </FormControl>
            <Button mt="2" colorScheme="indigo">
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
