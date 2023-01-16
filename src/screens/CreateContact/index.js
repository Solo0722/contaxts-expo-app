import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
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
  useToast,
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

const CreateContact = ({ navigation, route }) => {
  const { currentUser } = useContext(GlobalContext);
  const { contact, isEdit } = route.params;
  const toast = useToast();

  const [show, setShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();

  const [newContactData, setNewContactData] = useState({
    firstName: isEdit ? contact.firstName : null,
    lastName: isEdit ? contact.lastName : null,
    countryCode: isEdit ? contact.countryCode : null,
    phoneNumber: isEdit ? contact.phoneNumber : null,
    isFavorite: isEdit ? contact.isFavorite : false,
    imageUrl: isEdit ? contact.imageUrl : null,
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    isEdit &&
      navigation.setOptions({
        title: "Update Contact",
      });
  }, [isEdit]);

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

      setLoading(true);
      const doc = {
        _id: uuid.v4(),
        _type: "contact",
        ...newContactData,
        creator: {
          _type: "user",
          _ref: currentUser._id,
        },
      };

      client
        .createIfNotExists(doc)
        .then((result) => {
          setLoading(false);
          navigation.navigate(CONTACT_LIST);
          toast.show({
            description: "Contact created. Refresh to update",
          });
        })
        .catch((err) => console.error(err));
    }
  };

  const submitUpdatedContactForm = () => {
    if (validate() == true) {
      setErrors({});

      setLoading(true);

      client
        .patch(contact._id)
        .set(newContactData)
        .commit()
        .then((result) => {
          setLoading(false);
          navigation.navigate(CONTACT_LIST);
          toast.show({
            description: "Contact updated. Refresh to update",
          });
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <ScrollView style={styles.createContactWrapper}>
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
        {isEdit ? (
          <Button
            mt="2"
            colorScheme="indigo"
            isLoading={loading}
            onPress={submitUpdatedContactForm}
          >
            Update
          </Button>
        ) : (
          <Button
            mt="2"
            colorScheme="indigo"
            isLoading={loading}
            onPress={submitNewContactForm}
          >
            Submit
          </Button>
        )}
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
    </ScrollView>
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
