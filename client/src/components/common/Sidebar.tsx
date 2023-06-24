import { ChatIcon } from "@chakra-ui/icons";
import {
  TabList,
  Button,
  Divider,
  HStack,
  Heading,
  VStack,
  Tab,
  Avatar,
  AvatarBadge,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useChatInfo } from "../context/chatContext";
import { useSocketInfo } from "../context/socketContext";
import { get } from "lodash";
import { useAuth } from "../context/authContext";
import NewChatModal from "../modal/NewChat.modal";

export default function Sidebar() {
  const { setCurRoom } = useChatInfo();
  const { rooms } = useSocketInfo();
  const { logged } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const chatnames = rooms!.map((room) =>
    !room.isPrivate
      ? room.name
      : room.members!.filter((member) => member.id != get(logged, "id"))[0]
          .username
  );
  return (
    <>
      <VStack py="1.5rem">
        <HStack justify="start" w="100%" px="1.2rem" gap="3">
          <Heading size="md" display={["none", "none", "block"]}>
            Start Conversation
          </Heading>
          <Button onClick={onOpen}>
            <ChatIcon />
          </Button>
        </HStack>
        <Divider />
        <VStack as={TabList} w="100%" py="1.5rem">
          {rooms.map((room, index) => (
            <HStack
              key={room.id}
              w="90%"
              as={Tab}
              gap="3"
              justify="start"
              onClick={() => setCurRoom(room)}
            >
              <Avatar size="sm">
                <AvatarBadge bg="tomato" boxSize="1.1em" />
              </Avatar>
              <Text>{chatnames[index]}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
      <NewChatModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
