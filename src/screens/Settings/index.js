import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Divider, FlatList, Heading, Pressable } from "native-base";

const Settings = () => {
  const data = [
    {
      id: "my-info",
      title: "My Info",
      subTitle: "Set up my profile",
      onPress: () => null,
    },
    {
      id: "my-accounts",
      title: "Accounts",
      subTitle: null,
      onPress: () => null,
    },
    {
      id: "defaultacc",
      title: "Default account for new contacts",
      subTitle: "hello@gmail.com",
      onPress: () => null,
    },
    {
      id: "contactsdis",
      title: "Contacts to display",
      subTitle: "All contacts",
      onPress: () => null,
    },
    {
      id: "sortby",
      title: " Sort by",
      subTitle: "First name",
      onPress: () => null,
    },
    {
      id: "nameformat",
      title: "Name format",
      subTitle: "First name first",
      onPress: () => null,
    },
    {
      id: "import",
      title: "Import contacts",
      subTitle: null,
      onPress: () => null,
    },
    {
      id: "export",
      title: "Export contacts",
      subTitle: null,
      onPress: () => null,
    },
    {
      id: "blocked",
      title: "Blocked contacts",
      subTitle: null,
      onPress: () => null,
    },
    {
      id: "about",
      title: "About Contaxts",
      subTitle: null,
      onPress: () => null,
    },
    {
      id: "aboutdev",
      title: "About Developer",
      subTitle: null,
      onPress: () => null,
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={styles.wrapper}
        _pressed={{
          bgColor: "coolGray.200",
        }}
      >
        <Heading size="sm" fontWeight="600" color="coolGray.800">
          {item.title}
        </Heading>
        <Heading mt="1" color="coolGray.400" fontWeight="medium" size="xs">
          {item.subTitle}
        </Heading>
      </Pressable>
    );
  };

  return (
    <View style={styles.settingsWrapper}>
      <View>
        <FlatList
          bouncesZoom
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={<Divider bg="coolGray.100" />}
          ListFooterComponent={<View style={{ height: 50 }}></View>}
        />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  settingsWrapper: {
    paddingVertical: 10,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});
