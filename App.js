import { extendTheme, NativeBaseProvider } from "native-base";
import "react-native-gesture-handler";
import AppNavigation from "./src/navigations";

export default function App() {
  const theme = extendTheme({
    colors: {
      primary: {
        50: "#eef2ff",
        100: "#e0e7ff",
        200: "#c7d2fe",
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81",
      },
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <AppNavigation />
    </NativeBaseProvider>
  );
}
