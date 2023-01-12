import * as ImagePicker from "expo-image-picker";

export const useCamera = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchCameraAsync({ allowsEditing: true });
  if (!result.canceled) {
    return result.assets[0];
  }
};
