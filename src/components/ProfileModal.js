import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Modal, VStack, Button, FormControl, Input } from "native-base";

const ProfileModal = ({ profileModalVisible, setProfileModalVisible }) => {
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
          <Modal.Header>Forgot Password?</Modal.Header>
          <Modal.Body>
            Enter email address and we'll send a link to reset your password.
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              onPress={() => {
                setProfileModalVisible(false);
              }}
            >
              Proceed
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({});
