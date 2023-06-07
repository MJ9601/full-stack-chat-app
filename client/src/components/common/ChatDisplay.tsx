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
import { get } from "lodash";

export default function ChatDisplay() {
  const { rooms, curRoom } = useChatInfo();
  const { logged } = useAuth();
  const chatnames = rooms.map((room) =>
    room.name
      ? room.name
      : room.members!.filter((member) => member != get(logged, "id"))[0]
  );
  return (
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
        </Grid>
      )}
    </VStack>
  );
}
