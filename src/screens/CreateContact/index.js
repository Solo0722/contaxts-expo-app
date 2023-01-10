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

const CreateContact = () => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("");

  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <View style={styles.createContactWrapper}>
      <View style={styles.imagePickerWrapper}>
        <Image
          source={{ uri: DEFAULT_IMAGE_URI }}
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
        <FormControl>
          <FormControl.Label>First name</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>
          <FormControl.Label>Last name</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>
          <FormControl.Label>Phone number</FormControl.Label>
          <Input
            keyboardType="phone-pad"
            InputLeftElement={
              countryCode === "" ? (
                <IconButton
                  onPress={() => setShow(true)}
                  icon={<Icon as={<Ionicons name="flag-outline" />} size={5} />}
                />
              ) : (
                <Button onPress={() => setShow(true)}>{countryCode}</Button>
              )
            }
          />
        </FormControl>
        <View style={styles.favoriteWrapper}>
          <Heading color="colorGray.600" fontWeight="medium" size="sm">
            Add to favorites
          </Heading>
          <Switch defaultIsChecked={false} colorScheme="secondary" />
        </View>
        <Button mt="2" colorScheme="indigo">
          Submit
        </Button>
      </VStack>
      <CountryPicker
        show={show}
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={useCamera}>
            <HStack space="2">
              <Icon as={<Ionicons name="camera-outline" />} size={5} />
              <Text>Take from camera</Text>
            </HStack>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={pickImage}>
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
