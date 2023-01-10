import React from "react";
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
import { CREATE_CONTACT } from "../../constants/routeNames";
import Searchbar from "../../components/Searchbar";

const Contacts = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

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

  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Aafreen Khan",
      timeStamp: "12:47 PM",
      recentText: "Good Day!",
      avatarUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullName: "Sujitha Mathur",
      timeStamp: "11:11 PM",
      recentText: "+233599171142",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      fullName: "Anci Barroco",
      timeStamp: "6:22 PM",
      recentText: "+233599171142",
      avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
    },
    {
      id: "68694a0f-3da1-431f-bd56-142371e29d72",
      fullName: "Aniket Kumar",
      timeStamp: "8:56 PM",
      recentText: "+233599171142",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Kiara",
      timeStamp: "12:47 PM",
      recentText: "+233599171142",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Kiara",
      timeStamp: "12:47 PM",
      recentText: "+233599171142",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Kiara",
      timeStamp: "12:47 PM",
      recentText: "+233599171142",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Kiara",
      timeStamp: "12:47 PM",
      recentText: "+233599171142",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Kiara",
      timeStamp: "12:47 PM",
      recentText: "+233599171142",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Kiara",
      timeStamp: "12:47 PM",
      recentText: "+233599171142",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={styles.contactCard}
        _pressed={{
          bgColor: "coolGray.200",
        }}
      >
        <View style={styles.secondaryCardWrapper}>
          {item.avatarUrl ? (
            <Image
              size={10}
              borderRadius={100}
              source={{
                uri: item.avatarUrl,
              }}
              alt="Alternate Text"
            />
          ) : (
            <Avatar bg="indigo.500" size="sm" width={10} height={10}>
              {item.fullName.slice(0, 1)}
            </Avatar>
          )}
          <View style={styles.nameWrapper}>
            <Heading size="sm" fontWeight="600" color="coolGray.800">
              {item.fullName}
            </Heading>
            <Heading
              mt="1"
              // mb="1"
              color="coolGray.400"
              fontWeight="medium"
              size="xs"
            >
              {item.recentText}
            </Heading>
          </View>
        </View>

        <View>
          <Icon as={AntDesign} name="right" size="xs" />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.contactsWrapper}>
      <Searchbar />
      <View>
        <FlatList
          bouncesZoom
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={EmptyListComponent}
          ItemSeparatorComponent={<Divider bg="coolGray.100" />}
          ListFooterComponent={<View style={{ height: 50 }}></View>}
        />
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
