import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Modal, VStack, Button, Heading } from "native-base";
import { GlobalContext } from "../context/context";

const SettingsModals = ({ modalsVisible, setModalsVisible }) => {
  const { currentUser } = useContext(GlobalContext);
  return (
    <>
      <Modal
        isOpen={modalsVisible.isVisible}
        onClose={() => setModalsVisible({ ...modalsVisible, isVisible: false })}
        avoidKeyboard
        justifyContent="center"
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{modalsVisible.name}</Modal.Header>
          <Modal.Body>
            {modalsVisible.name === "About developer" ||
            modalsVisible.name === "About Contaxts" ? (
              <VStack>
                {modalsVisible.data.map((item, i) => (
                  <View
                    key={i}
                    mt="1"
                    fontWeight="medium"
                    size="sm"
                    onPress={item.onPress}
                    variant={"outline"}
                  >
                    {item.title}
                  </View>
                ))}
              </VStack>
            ) : (
              <VStack>
                {modalsVisible.data.map((item, i) => (
                  <Button
                    key={i}
                    mt="1"
                    fontWeight="medium"
                    size="sm"
                    onPress={item.onPress}
                    variant={"outline"}
                  >
                    {item.title}
                  </Button>
                ))}
              </VStack>
            )}
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default SettingsModals;

const styles = StyleSheet.create({});
