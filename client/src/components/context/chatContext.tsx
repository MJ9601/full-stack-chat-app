import { createContext, useContext, useEffect, useState } from "react";
import { ChatContext } from "./context";


const ChatContext = createContext<ChatContext>({
  rooms: [],
  setRooms: () => false,
  curRoom: {},
  setCurRoom: () => false,
});

export default function ChatProvider(props: any) {
  const [rooms, setRooms] = useState([
    { id: "1", name: "firstRoom" },
    { id: "2", name: "secondRoom" },
    { id: "3", name: "firstRoom" },
  ]);
  const [curRoom, setCurRoom] = useState({});

  return (
    <ChatContext.Provider
      value={{ rooms, setRooms, curRoom, setCurRoom }}
      {...props}
    />
  );
}

export const useChatInfo = () => useContext(ChatContext);
