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
  Input,
  FormLabel,
} from "@chakra-ui/react";

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
        <ModalBody pt="1.5rem">
          <FormLabel>Enter his/her Email:</FormLabel>
          <Input type="email" />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={onClose}>
            Start
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
