import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import React, { useState } from "react";
import {
  VStack,
  Input,
  Button,
  FormControl,
  Icon,
  IconButton,
  Image,
  Heading,
  Pressable,
  Switch,
  Actionsheet,
  useDisclose,
  Box,
  HStack,
} from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CountryPicker } from "react-native-country-codes-picker";
import { DEFAULT_IMAGE_URI } from "../../constants/general";
import { pickImage } from "../../helpers/pickImage";
import { useCamera } from "../../helpers/useCamera";
import { useContext } from "react";
import { GlobalContext } from "../../context/context";
import uuid from "react-native-uuid";
import { client } from "../../helpers/sanity/sanityClient";
import { CONTACT_LIST } from "../../constants/routeNames";

const CreateContact = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const { loggedInUser } = useContext(GlobalContext);

  const { isOpen, onOpen, onClose } = useDisclose();

  const [newContactData, setNewContactData] = useState({
    firstName: null,
    lastName: null,
    countryCode: null,
    phoneNumber: null,
    isFavorite: false,
    imageUrl: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e, name) => {
    setNewContactData({
      ...newContactData,
      [name]: typeof e === "string" ? e.trim() : e,
    });
  };

  const validate = () => {
    if (!newContactData.firstName) {
      setErrors({
        firstName: "First name is required",
      });
      return false;
    }

    if (!newContactData.lastName) {
      setErrors({
        lastName: "Last name is required",
      });
      return false;
    }
    if (!newContactData.phoneNumber) {
      setErrors({
        phoneNumber: "Phone number is required",
      });
      return false;
    }

    return true;
  };

  const submitNewContactForm = () => {
    if (validate() == true) {
      setErrors({});

      const doc = {
        _id: uuid.v4(),
        _type: "contact",
        ...newContactData,
        creator: {
          _type: "user",
          _ref: loggedInUser._id,
        },
      };

      client
        .createIfNotExists(doc)
        .then((result) => {
          console.log(result);
          navigation.navigate(CONTACT_LIST);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <View style={styles.createContactWrapper}>
      <View style={styles.imagePickerWrapper}>
        <Image
          source={{ uri: newContactData.imageUrl || DEFAULT_IMAGE_URI }}
          alt="default image"
          size={150}
          borderRadius={100}
        />
        <Pressable
          _pressed={{
            bgColor: "coolGray.200",
          }}
        >
          <Heading
            mt="1"
            mb="1"
            color="indigo.600"
            fontWeight="medium"
            size="xs"
            onPress={onOpen}
          >
            Choose image
          </Heading>
        </Pressable>
      </View>
      <VStack space={3} mt="5">
        <FormControl isInvalid={"firstName" in errors}>
          <FormControl.Label>First name</FormControl.Label>
          <Input
            value={newContactData.firstName}
            onChangeText={(e) => handleChange(e, "firstName")}
          />
          {"firstName" in errors && (
            <FormControl.ErrorMessage>
              {errors.firstName}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={"lastName" in errors}>
          <FormControl.Label>Last name</FormControl.Label>
          <Input
            value={newContactData.lastName}
            onChangeText={(e) => handleChange(e, "lastName")}
          />
          {"lastName" in errors && (
            <FormControl.ErrorMessage>
              {errors.lastName}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={"phoneNumber" in errors}>
          <FormControl.Label>Phone number</FormControl.Label>
          <Input
            value={newContactData.phoneNumber}
            onChangeText={(e) => handleChange(e, "phoneNumber")}
            keyboardType="phone-pad"
            InputLeftElement={
              newContactData.countryCode === null ? (
                <IconButton
                  onPress={() => setShow(true)}
                  icon={<Icon as={<Ionicons name="flag-outline" />} size={5} />}
                />
              ) : (
                <Button onPress={() => setShow(true)}>
                  {newContactData.countryCode}
                </Button>
              )
            }
          />
          {"phoneNumber" in errors && (
            <FormControl.ErrorMessage>
              {errors.phoneNumber}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <View style={styles.favoriteWrapper}>
          <Heading color="colorGray.600" fontWeight="medium" size="sm">
            Add to favorites
          </Heading>
          <Switch
            defaultIsChecked={false}
            isChecked={newContactData.isFavorite}
            colorScheme="secondary"
            onToggle={(e) => handleChange(e, "isFavorite")}
          />
        </View>
        <Button mt="2" colorScheme="indigo" onPress={submitNewContactForm}>
          Submit
        </Button>
      </VStack>
      <CountryPicker
        show={show}
        pickerButtonOnPress={(item) => {
          handleChange(item.dial_code, "countryCode");
          setShow(false);
        }}
      />
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={() =>
              useCamera().then((result) => handleChange(result.uri, "imageUrl"))
            }
          >
            <HStack space="2">
              <Icon as={<Ionicons name="camera-outline" />} size={5} />
              <Text>Take from camera</Text>
            </HStack>
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() =>
              pickImage().then((result) => handleChange(result.uri, "imageUrl"))
            }
          >
            <HStack space="2">
              <Icon as={<Ionicons name="image-outline" />} size={5} />
              <Text>Choose from gallery</Text>
            </HStack>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

export default CreateContact;

const styles = StyleSheet.create({
  createContactWrapper: {
    backgroundColor: "#fff",
    padding: 20,
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  imagePickerWrapper: {
    marginBottom: 10,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteWrapper: {
    marginBottom: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
