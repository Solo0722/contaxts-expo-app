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
  Popover,
  ScrollView,
} from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import { singleContactQuery } from "../../helpers/sanity/sanityQueries";
import { client } from "../../helpers/sanity/sanityClient";
import { DEFAULT_IMAGE_URI } from "../../constants/general";
import SpinnerAnimation from "../../components/SpinnerAnimation";
import { CONTACT_LIST, CREATE_CONTACT } from "../../constants/routeNames";
import { callNumber } from "../../helpers/callNumber";
import { messageNumber } from "../../helpers/messageNumber";
import { openWhatsapp } from "../../helpers/openWhatsapp";

const ContactDetail = ({ navigation, route }) => {
  const { contactId } = route.params;
  const [contact, setContact] = useState(null);

  const getContactDetail = () => {
    const q = singleContactQuery(contactId);
    client
      .fetch(q)
      .then((result) => {
        setContact(result[0]);
        navigation.setOptions({
          title: result[0].firstName,
          headerRight: () => {
            return (
              <HStack space={2} mr={5}>
                {result[0].isFavorite === true && (
                  <IconButton
                    colorScheme={"lime"}
                    icon={<Icon as={Ionicons} name="star" size="sm" />}
                  />
                )}

                <Popover
                  trigger={(triggerProps) => {
                    return (
                      <IconButton
                        {...triggerProps}
                        colorScheme={"danger"}
                        icon={
                          <Icon as={Ionicons} name="trash-outline" size="sm" />
                        }
                      />
                    );
                  }}
                >
                  <Popover.Content accessibilityLabel="Delete Customerd" w="56">
                    <Popover.Arrow />
                    <Popover.CloseButton />
                    <Popover.Header>Delete Customer</Popover.Header>
                    <Popover.Body>
                      {`This will remove all data relating to ${
                        contact ? contact.firstName : `this contact`
                      }. This action cannot be reversed. Deleted data can not be recovered.`}
                    </Popover.Body>
                    <Popover.Footer justifyContent="flex-end">
                      <Button.Group space={2}>
                        <Button colorScheme="coolGray" variant="ghost">
                          Cancel
                        </Button>
                        <Button colorScheme="danger" onPress={deleteContact}>
                          Delete
                        </Button>
                      </Button.Group>
                    </Popover.Footer>
                  </Popover.Content>
                </Popover>
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

  const handleEdit = () => {
    navigation.navigate(CREATE_CONTACT, {
      contact,
      isEdit: true,
    });
  };

  const deleteContact = () => {
    client.delete(contactId).then(() => navigation.navigate(CONTACT_LIST));
  };

  return (
    <ScrollView style={styles.contactDetailWrapper}>
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
            onPress={() =>
              callNumber(`${contact.countryCode}${contact.phoneNumber}`)
            }
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
                onPress={() =>
                  messageNumber(`${contact.countryCode}${contact.phoneNumber}`)
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
            onPress={() =>
              openWhatsapp(`${contact.countryCode}${contact.phoneNumber}`)
            }
          >
            <View style={styles.secondaryCardWrapper}>
              <IconButton
                icon={<Icon as={Ionicons} name="logo-whatsapp" size="sm" />}
              />
              <View style={styles.nameWrapper}>
                <Heading size="sm" fontWeight="600" color="coolGray.800">
                  {`${contact.countryCode}${contact.phoneNumber}`}
                </Heading>
              </View>
            </View>
          </Pressable>
          <Button margin={10} onPress={handleEdit}>
            Edit Contact
          </Button>
        </View>
      )}
    </ScrollView>
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
