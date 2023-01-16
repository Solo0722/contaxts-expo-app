import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import {
  Modal,
  VStack,
  Button,
  FormControl,
  Input,
  Image,
  Avatar,
  Heading,
} from "native-base";
import { GlobalContext } from "../context/context";
import { DEFAULT_IMAGE_URI } from "../constants/general";

const ProfileModal = ({ profileModalVisible, setProfileModalVisible }) => {
  const { currentUser } = useContext(GlobalContext);
  return (
    <>
      <Modal
        isOpen={profileModalVisible}
        onClose={() => setProfileModalVisible(false)}
        avoidKeyboard
        justifyContent="center"
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{currentUser.username}</Modal.Header>
          <Modal.Body>
            <VStack space={2} display={"flex"} alignItems="center">
              <Avatar
                bg="green.500"
                source={{
                  uri: DEFAULT_IMAGE_URI,
                }}
              >
                {currentUser.username.slice(0, 1)}
              </Avatar>
              <Heading
                size="xs"
                fontSize={15}
                fontWeight="600"
                color="coolGray.800"
              >
                {`${currentUser.firstName} ${currentUser.lastName}`}
              </Heading>
              <Heading
                mt="1"
                color="coolGray.400"
                fontWeight="medium"
                size="xs"
              >
                {currentUser.email}
              </Heading>
            </VStack>
          </Modal.Body>
          <Modal.Footer borderTopWidth={0}>
            <Button
              flex="1"
              onPress={() => {
                setProfileModalVisible(false);
              }}
            >
              Manage Profile
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({});
