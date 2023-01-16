import { Toast } from "native-base";
import { Linking, Alert, Platform } from "react-native";

export const openWhatsapp = (phone) => {
  let phoneNumber = `whatsapp://send?phone=${phone}&text= `;

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
