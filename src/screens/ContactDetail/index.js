import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Image,
  Heading,
  Divider,
  Icon,
  IconButton,
  Pressable,
  HStack,
  Button,
} from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import { singleContactQuery } from "../../helpers/sanity/sanityQueries";
import { client } from "../../helpers/sanity/sanityClient";
import { DEFAULT_IMAGE_URI } from "../../constants/general";
import SpinnerAnimation from "../../components/SpinnerAnimation";

const ContactDetail = ({ navigation, route }) => {
  const { contactId } = route.params;
  const [contact, setContact] = useState(null);

  const getContactDetail = () => {
    const q = singleContactQuery(contactId);
    client
      .fetch(q)
      .then((result) => {
        console.log(result);
        setContact(result[0]);
        navigation.setOptions({
          title: result[0].firstName,
          headerRight: () => {
            return (
              <HStack space={2} mr={5}>
                {result[0].isFavorite ? (
                  <IconButton
                    colorScheme={"lime"}
                    icon={<Icon as={Ionicons} name="star" size="sm" />}
                  />
                ) : (
                  <IconButton
                    colorScheme={"lime"}
                    icon={<Icon as={Ionicons} name="star-outline" size="sm" />}
                  />
                )}

                <IconButton
                  colorScheme={"danger"}
                  icon={<Icon as={Ionicons} name="trash-outline" size="sm" />}
                />
              </HStack>
            );
          },
        });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getContactDetail();
  }, []);

  return (
    <View style={styles.contactDetailWrapper}>
      {!contact ? (
        <SpinnerAnimation />
      ) : (
        <View style={{ width: "100%", height: "100%", flex: 1 }}>
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri: contact.imageUrl || DEFAULT_IMAGE_URI,
              }}
              alt="number-pic"
              style={styles.image}
            />
          </View>
          <View style={styles.nameContainer}>
            <Heading
              size="md"
              fontWeight="600"
              color="coolGray.800"
              textAlign={"center"}
            >
              {`${contact.firstName} ${contact.lastName}`}
            </Heading>
          </View>
          <Divider bg="coolGray.200" />
          <Pressable
            _pressed={{
              bgColor: "indigo.100",
            }}
            android_ripple={{
              color: "indigo.100",
            }}
            style={styles.contactInfo}
          >
            <View style={styles.secondaryCardWrapper}>
              <IconButton
                icon={<Icon as={Ionicons} name="call-outline" size="sm" />}
              />
              <View style={styles.nameWrapper}>
                <Heading size="sm" fontWeight="600" color="coolGray.800">
                  {`${contact.countryCode}${contact.phoneNumber}`}
                </Heading>
                <Heading
                  mt="1"
                  // mb="1"
                  color="coolGray.400"
                  fontWeight="medium"
                  size="xs"
                >
                  Mobile
                </Heading>
              </View>
            </View>

            <View>
              <IconButton
                icon={
                  <Icon as={Ionicons} name="chatbubble-outline" size="sm" />
                }
              />
            </View>
          </Pressable>
          <Pressable
            _pressed={{
              bgColor: "indigo.100",
            }}
            android_ripple={{
              color: "indigo.100",
            }}
            style={[
              styles.contactCard,
              { paddingTop: 20, paddingBottom: 20, paddingLeft: 10 },
            ]}
          >
            <View style={styles.secondaryCardWrapper}>
              <IconButton
                icon={<Icon as={Ionicons} name="videocam-outline" size="sm" />}
              />
              <View style={styles.nameWrapper}>
                <Heading size="sm" fontWeight="600" color="coolGray.800">
                  {`${contact.countryCode}${contact.phoneNumber}`}
                </Heading>
              </View>
            </View>
          </Pressable>
          <Button margin={10}>Edit Contact</Button>
        </View>
      )}
    </View>
  );
};

export default ContactDetail;

const styles = StyleSheet.create({
  contactDetailWrapper: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  imageWrapper: {
    width: "100%",
    height: 250,
    backgroundColor: "indigo",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  nameContainer: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  contactInfo: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    // marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  secondaryCardWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  nameWrapper: {
    marginLeft: 10,
  },
});
