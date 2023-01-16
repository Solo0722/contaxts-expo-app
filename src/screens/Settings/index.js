import { Linking, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Divider, FlatList, Heading, Pressable, VStack } from "native-base";
import { GlobalContext } from "../../context/context";
import ProfileModal from "../../components/ProfileModal";
import SettingsModals from "../../components/SettingsModals";

const Settings = () => {
  const { currentUser } = useContext(GlobalContext);
  const [profileModalVisible, setProfileModalVisible] = React.useState(false);
  const [modalsVisible, setModalsVisible] = React.useState({
    isVisible: false,
    data: [],
    name: "",
  });

  const data = [
    {
      id: "my-info",
      title: "My Info",
      subTitle: `${currentUser.firstName} ${currentUser.lastName}`,
      onPress: () => setProfileModalVisible(true),
    },
    {
      id: "my-contacts",
      title: "Contacts",
      subTitle: "1000 contacts",
      onPress: () => null,
    },
    {
      id: "defaultacc",
      title: "Default account for new contacts",
      subTitle: currentUser.email,
      onPress: () => null,
    },
    {
      id: "contactsdisplay",
      title: "Contacts to display",
      subTitle: "All contacts",
      onPress: () =>
        setModalsVisible({
          isVisible: true,
          name: "Contacts to display",
          data: [
            { title: "All contacts", onPress: () => null },
            { title: "Favorites", onPress: () => null },
            { title: "Not Favorites", onPress: () => null },
          ],
        }),
    },
    {
      id: "sortby",
      title: " Sort by",
      subTitle: "First name",
      onPress: () =>
        setModalsVisible({
          isVisible: true,
          name: "Sort order",
          data: [
            { title: "Ascending", onPress: () => null },
            { title: "Descending", onPress: () => null },
            { title: "Date created", onPress: () => null },
          ],
        }),
    },
    {
      id: "nameformat",
      title: "Name format",
      subTitle: "First name first",
      onPress: () =>
        setModalsVisible({
          isVisible: true,
          name: "Name format",
          data: [
            { title: "First name first", onPress: () => null },
            { title: "Last name first", onPress: () => null },
          ],
        }),
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
      onPress: () =>
        setModalsVisible({
          isVisible: true,
          name: "About Contaxts",
          data: [
            {
              title: (
                <VStack space={2}>
                  <Heading fontWeight={"400"} size={"xs"}>
                    Contaxts is a contact listing application developed with
                    react native using expo. This project is actually my first
                    real world project in react native. This app can basically
                    is CRUD application where users can: Create new contacts
                    Update contacts Delete contacts and soo much more. I hope
                    you enjoy using this application!
                  </Heading>
                  <Heading fontWeight={"400"} size={"xs"}>
                    If you liked this app, you can help medo more by buying me a
                    coffee at
                  </Heading>
                  <Heading
                    size={"xs"}
                    color="indigo.500"
                    onPress={() =>
                      Linking.openURL(
                        "https://https://www.buymeacoffee.com/owusuansah0"
                      )
                    }
                  >
                    Buymeacoffee
                  </Heading>
                </VStack>
              ),
              onPress: () => null,
            },
          ],
        }),
    },
    {
      id: "aboutdev",
      title: "About Developer",
      subTitle: null,
      onPress: () =>
        setModalsVisible({
          isVisible: true,
          name: "About developer",
          data: [
            {
              title: (
                <VStack space={2}>
                  <Heading fontWeight={"400"} size={"xs"}>
                    Hola, I'm Owusu-Ansah Solomon, a self-taught passionate
                    frontend developer from Ghana. I'm currently studying BSc.
                    Computer Engineering at Kwame Nkrumah University Of Science
                    and Technology in Kumasi,Ghana.I have 2+ years experience in
                    frontend development.I am fueled by my passion for
                    programming and ambition to better myself as a developer. I
                    also consider myself as a 'forever student', eager to both
                    build on developing my skills and stay in tune with the
                    latest technological advancement.
                  </Heading>
                  <Heading fontWeight={"400"} size={"xs"}>
                    You can contact me through my portfolio website
                  </Heading>
                  <Heading
                    size={"xs"}
                    color="indigo.500"
                    onPress={() =>
                      Linking.openURL("https://oasolomon.vercel.app")
                    }
                  >
                    oasolomon.vercel.app
                  </Heading>
                  <Heading fontWeight={"400"} size={"xs"}>
                    You can also find my github account at
                  </Heading>
                  <Heading
                    size={"xs"}
                    color="indigo.500"
                    onPress={() =>
                      Linking.openURL("https://github.com/Solo0722")
                    }
                  >
                    Solomon Owusu-Ansah
                  </Heading>
                  <Heading fontWeight={"400"} size={"xs"}>
                    If you liked this app, you can help medo more by buying me a
                    coffee at
                  </Heading>
                  <Heading
                    size={"xs"}
                    color="indigo.500"
                    onPress={() =>
                      Linking.openURL(
                        "https://https://www.buymeacoffee.com/owusuansah0"
                      )
                    }
                  >
                    Buymeacoffee
                  </Heading>
                </VStack>
              ),
              onPress: () => null,
            },
          ],
        }),
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={styles.wrapper}
        _pressed={{
          bgColor: "coolGray.200",
        }}
        onPress={item.onPress}
      >
        <Heading size="xs" fontSize={15} fontWeight="600" color="coolGray.800">
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
      <ProfileModal
        profileModalVisible={profileModalVisible}
        setProfileModalVisible={setProfileModalVisible}
      />
      <SettingsModals
        modalsVisible={modalsVisible}
        setModalsVisible={setModalsVisible}
      />
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
