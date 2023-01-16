import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Input, Icon, IconButton } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { searchQuery } from "../helpers/sanity/sanityQueries";
import { client } from "../helpers/sanity/sanityClient";
import { GlobalContext } from "../context/context";

const Searchbar = ({ setLoading, setContacts }) => {
  const [searchTerm, setSearchTerm] = useState(null);

  // const searchContact = () => {
  //   if (searchTerm !== null || searchTerm !== "") {
  //     const q = searchQuery(searchTerm);
  //     setLoading(true);
  //     client
  //       .fetch(q)
  //       .then((result) => {
  //         console.log(result);
  //         setContacts(result);
  //         setLoading(false);
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // };

  return (
    <View style={styles.searchbar}>
      <Input
        padding={2}
        variant={"filled"}
        InputRightElement={
          <IconButton
            // onPress={searchContact}
            variant="ghost"
            icon={
              <Icon
                as={<Ionicons name="search-outline" />}
                size={5}
                color="muted.400"
              />
            }
          />
        }
        placeholder="Search contacts..."
        value={searchTerm}
        onChangeText={(e) => setSearchTerm(e)}
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
