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
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import TextField from "../common/TextField";
import * as yup from "yup";

export default function NewChatModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
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
            alert(JSON.stringify(values));
            actions.resetForm();
            onClose();
          }}
        >
          <Form>
            <ModalBody pt="1.5rem">
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
