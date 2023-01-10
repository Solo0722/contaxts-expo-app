import { NativeBaseProvider } from "native-base";
import "react-native-gesture-handler";
import AppNavigation from "./src/navigations";

export default function App() {
  return (
    <NativeBaseProvider>
      <AppNavigation />
    </NativeBaseProvider>
  );
}
