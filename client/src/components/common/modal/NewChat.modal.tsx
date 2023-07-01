import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Divider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import SelectionInput from "../SelectionInput";
import * as yup from "yup";
import { useSocketInfo } from "../../context/socketContext";
import EVENTS from "../../../utils/EVENTS";
import { useCallback, useState } from "react";
import { Room } from "../../context/chatInfo";

export default function NewChatModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { socket, setCurRoom, emailList } = useSocketInfo();
  const [error, setError] = useState<any>(null);

  const closeModal = useCallback(() => {
    setError(null);
    onClose();
  }, [onClose]);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      {/* @ts-ignore */}
      <ModalContent>
        <ModalHeader>Start A Conversation</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <Formik
          initialValues={{ username: "" }}
          validationSchema={yup.object({
            username: yup.string().required("username is required!").email(),
          })}
          onSubmit={async (values, actions) => {
            actions.resetForm();
            // alert(JSON.stringify(values));
            socket.emit(
              EVENTS.CLIENT.CREATE_PRIVATE,
              values.username,
              (err: Error, results: Room) => {
                // console.log("first");
                if (err) setError(err);
                else {
                  setCurRoom(results);
                  closeModal();
                }
              }
            );
            // onClose();
            // console.log(error);
            return;
          }}
        >
          <Form>
            {error && (
              <VStack>
                <Text color="red.500" mt="3" fontSize="lg" textAlign="center">
                  {error.name}
                </Text>
                <Text color="red.500" textAlign="center" mt="3">
                  {error.message}
                </Text>
              </VStack>
            )}
            <ModalBody pt="1.2rem">
              <SelectionInput
                // @ts-ignore
                name="username"
                type="email"
                label="Username"
                placeholder="Enter username"
                autoComplete="off"
                selectArr={emailList}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" type="submit">
                Start
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
}
