import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import Sidebar from "../common/Sidebar";
import ChatProvider from "../context/chatContext";
import ChatDisplay from "../common/ChatDisplay";

export default function Home() {
  return (
    <ChatProvider>
      {/*  @ts-ignore */}
      <Grid
        templateColumns="repeat(10, 1fr)"
        h="100vh"
        as={Tabs}
        variant="solid-rounded"
        colorScheme="gray"
      >
        <GridItem colSpan={[1, 1, 3, 2]} borderRight="1px solid gray">
          <Sidebar />
        </GridItem>
        <GridItem colSpan={[9, 9, 7, 8]}>
          <ChatDisplay />
        </GridItem>
      </Grid>
    </ChatProvider>
  );
}
