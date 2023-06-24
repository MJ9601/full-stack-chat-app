import {
  TabPanels,
  VStack,
  TabPanel,
  HStack,
  Divider,
  Avatar,
  AvatarBadge,
  Text,
  Grid,
} from "@chakra-ui/react";
import { useChatInfo } from "../context/chatContext";
import { useAuth } from "../context/authContext";
import { useSocketInfo } from "../context/socketContext";
import { get } from "lodash";
import { User } from "../context/chatInfo";

export default function ChatDisplay() {
  const { curRoom } = useChatInfo();
  const { rooms } = useSocketInfo();
  const { logged } = useAuth();
  const { socket } = useSocketInfo();
  const chatnames = rooms.map((room) =>
    !room.isPrivate
      ? room.name
      : room.members!.filter(
          (member: User) => member.id != get(logged, "id")
        )[0].username
  );
  return (
    // @ts-ignore
    <VStack py=".1rem">
      {(Object.keys(curRoom!) || curRoom).length ? (
        <TabPanels pt=".1rem">
          {rooms.map((room, index) => (
            <TabPanel key={room.id}>
              <HStack mb=".3rem">
                <Avatar>
                  <AvatarBadge />
                </Avatar>
                <Text>{String(chatnames[index])}</Text>
              </HStack>
              <Divider />
            </TabPanel>
          ))}
        </TabPanels>
      ) : (
        <Grid placeItems="center" alignContent="center" h="100vh">
          <Text fontSize="lg">Start Chating :)</Text>
          <Text>
            socketId {"=>"} {socket.id ? socket.id : "undefined!!"}
          </Text>
          <Text>just text</Text>
        </Grid>
      )}
    </VStack>
  );
}
