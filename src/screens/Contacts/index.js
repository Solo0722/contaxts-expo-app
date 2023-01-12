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
import { useCustomAsyncStorage } from "../../helpers/hooks/useCustomAsyncStorage";
import SpinnerAnimation from "../../components/SpinnerAnimation";

const Contacts = ({ navigation }) => {
  const { loggedInUser } = useContext(GlobalContext);

  const [contacts, setContacts] = useCustomAsyncStorage("contacts", []);
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

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
                uri: item.imageUrl,
              }}
              alt="Alternate Text"
            />
          ) : (
            <Avatar bg="indigo.500" size="sm" width={10} height={10}>
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
    const q = contactsQuery(loggedInUser._id);
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
    loggedInUser && getContacts();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    getContacts();
    setRefreshing(false);
  };

  return (
    <View style={styles.contactsWrapper}>
      <Searchbar />
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
            ListFooterComponent={<View style={{ height: 50 }}></View>}
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
        onPress={() => navigation.navigate(CREATE_CONTACT)}
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
