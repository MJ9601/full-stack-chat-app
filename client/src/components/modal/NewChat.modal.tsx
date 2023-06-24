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
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import TextField from "../common/TextField";
import * as yup from "yup";
import { useSocketInfo } from "../context/socketContext";
import EVENTS from "../../utils/EVENTS";
import { useState } from "react";
import { Room } from "../context/chatInfo";

export default function NewChatModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { socket, setRooms, setCurRoom } = useSocketInfo();
  const [error, setError] = useState<any>(null);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
                  // @ts-ignore
                  // setRooms((rooms) => [results, ...rooms] as Room[]);
                  onClose();
                  setError(null);
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
              <TextField
                // @ts-ignore
                name="username"
                type="email"
                label="Username"
                placeholder="Enter username"
                autoComplete="off"
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
