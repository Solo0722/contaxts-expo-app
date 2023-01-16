import { Toast } from "native-base";
import { Linking, Alert, Platform } from "react-native";

export const messageNumber = (phone) => {
  let phoneNumber = `sms:${phone}?body= `;

  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        Toast.show("Phone number is not available");
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => console.log(err));
};
