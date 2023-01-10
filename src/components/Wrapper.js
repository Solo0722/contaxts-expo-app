import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "native-base";

const Wrapper = ({ children }) => {
  return (
    <ScrollView>
      <View style={styles.wrapper}>{children}</View>
    </ScrollView>
  );
};

export default Wrapper;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
  },
});
