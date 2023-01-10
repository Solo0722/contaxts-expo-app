import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Input, Icon } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";

const Searchbar = () => {
  return (
    <View style={styles.searchbar}>
      <Input
        padding={2}
        variant={"filled"}
        InputLeftElement={
          <Icon
            as={<Ionicons name="search-outline" />}
            size={5}
            ml="2"
            color="muted.400"
          />
        }
        placeholder="Search contacts..."
      />
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  searchbar: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
