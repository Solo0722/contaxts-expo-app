import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Platform,
  StatusBar,
} from "react-native";
import {
  FlatList,
  Heading,
  Fab,
  Icon,
  Pressable,
  Image,
  Avatar,
  Divider,
} from "native-base";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { CONTACT_DETAIL, CREATE_CONTACT } from "../../constants/routeNames";
import Searchbar from "../../components/Searchbar";
import { GlobalContext } from "../../context/context";
import { contactsQuery } from "../../helpers/sanity/sanityQueries";
import { client } from "../../helpers/sanity/sanityClient";
import SpinnerAnimation from "../../components/SpinnerAnimation";
import { DEFAULT_IMAGE_URI } from "../../constants/general";

const Contacts = ({ navigation }) => {
  const { currentUser } = useContext(GlobalContext);
  const [contacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const colors = [
    "green.500",
    "blue.500",
    "rose.500",
    "fuchsia.500",
    "cyan.500",
    "lime.500",
    "yellow.400",
    "orange.500",
    "bluegray.500",
    "red.500",
    "amber.500",
  ];

  const EmptyListComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Heading
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
          textAlign="center"
        >
          No contacts to show!
        </Heading>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={styles.contactCard}
        _pressed={{
          bgColor: "indigo.100",
        }}
        android_ripple={{
          color: "indigo.100",
        }}
        onPress={() =>
          navigation.navigate(CONTACT_DETAIL, { contactId: item._id })
        }
      >
        <View style={styles.secondaryCardWrapper}>
          {item.imageUrl ? (
            <Image
              size={10}
              borderRadius={100}
              source={{
                uri: item.imageUrl || DEFAULT_IMAGE_URI,
              }}
              alt="Alternate Text"
            />
          ) : (
            <Avatar
              bg={colors[Math.floor(Math.random() * 10)] || "indigo.500"}
              size="sm"
              width={10}
              height={10}
            >
              {item.firstName.slice(0, 1)}
            </Avatar>
          )}
          <View style={styles.nameWrapper}>
            <Heading size="sm" fontWeight="600" color="coolGray.800">
              {`${item.firstName} ${item.lastName}`}
            </Heading>
            <Heading
              mt="1"
              // mb="1"
              color="coolGray.400"
              fontWeight="medium"
              size="xs"
            >
              {`${item.countryCode}${item.phoneNumber}`}
            </Heading>
          </View>
        </View>

        <View>
          <Icon as={AntDesign} name="right" size="xs" />
        </View>
      </Pressable>
    );
  };

  const getContacts = () => {
    const q = contactsQuery(currentUser._id);
    setLoading(true);
    client
      .fetch(q)
      .then((result) => {
        setContacts(result);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    currentUser && getContacts();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    getContacts();
    setRefreshing(false);
  };

  return (
    <View style={styles.contactsWrapper}>
      <Searchbar setLoading={setLoading} setContacts={setContacts} />
      <View>
        {loading ? (
          <SpinnerAnimation />
        ) : (
          <FlatList
            bouncesZoom
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            data={contacts}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={EmptyListComponent}
            ItemSeparatorComponent={<Divider bg="coolGray.100" />}
            ListFooterComponent={<View style={{ paddingTop: 100 }}></View>}
          />
        )}
      </View>
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        colorScheme={"pink"}
        bottom={10}
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        onPress={() =>
          navigation.navigate(CREATE_CONTACT, { contact: null, isEdit: false })
        }
      />
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  contactsWrapper: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    width: "100%",
    height: "100%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  emptyContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  contactCard: {
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
