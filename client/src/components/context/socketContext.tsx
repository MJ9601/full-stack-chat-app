import { io, Socket } from "socket.io-client";
import EVENTS from "../../utils/EVENTS";
import constants from "../../utils/constants";
// import { socketConnection } from "../../hook/socket.connect";
import { createContext, useContext, useEffect, useState } from "react";
import { Room } from "./chatInfo";

interface Context {
  socket: Socket;
  curRoom: Room | {};
  setCurRoom: (input: Room) => void;
  rooms: Room[];
  setRooms: (input: Room[]) => void;
  emailList: string[];
  setEmailList: (input: string[] | string) => void;
}

const socket = io(constants.socketUrl, {
  autoConnect: false,
  withCredentials: true,
});

const SocketContext = createContext<Context>({
  socket,
  curRoom: {},
  setCurRoom: () => false,
  rooms: [],
  setRooms: () => false,
  emailList: [],
  setEmailList: () => false,
});

export default function SocketProvider(props: any) {
  const [curRoom, setCurRoom] = useState<Room | {}>({});
  const [rooms, setRooms] = useState<Room[]>([]);
  const [emailList, setEmailList] = useState<string[]>([]);

  // init socket connection.
  useEffect(() => {
    socket.connect();
    socket.on(EVENTS.CONNECT_ERR, (err: any) => {
      console.log(err.message);
    });
    return () => {
      socket.off(EVENTS.CONNECT_ERR);
    };
  }, []);

  socket.on(EVENTS.SERVER.ROOMS, (rooms) => {
    setRooms(rooms);
  });

  socket.on(EVENTS.SERVER.CUR_ROOM, (room) => {
    setCurRoom(room);
  });

  socket.on(EVENTS.SERVER.EMAILS, (emails) => {
    setEmailList(emails);
  });

  console.log(emailList);
  return (
    <SocketContext.Provider
      value={{
        socket,
        curRoom,
        setCurRoom,
        rooms,
        setRooms,
        emailList,
        setEmailList,
      }}
      {...props}
    />
  );
}

export const useSocketInfo = () => useContext(SocketContext);
