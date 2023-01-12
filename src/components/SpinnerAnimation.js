import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Spinner } from "native-base";

const SpinnerAnimation = () => {
  return (
    <View style={styles.spinner}>
      <Spinner color="indigo.500" />
    </View>
  );
};

export default SpinnerAnimation;

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
});
