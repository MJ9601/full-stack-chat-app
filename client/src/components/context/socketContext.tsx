import { io, Socket } from "socket.io-client";
import EVENTS from "../../events";
import constants from "../../constants";
import { createContext, useContext, useEffect, useState } from "react";

interface Context {
  socket: Socket;
}

const socket = io(constants.socketUrl, {
  autoConnect: false,
  withCredentials: true,
});

const SocketContext = createContext<Context>({ socket });

export default function SocketProvider(props: any) {
  useEffect(() => {
    console.log(EVENTS.CONNECTION);
    socket.connect();
    socket.on(EVENTS.CONNECT_ERR, () => {
      console.log("error");
    });
    return () => {
      socket.off(EVENTS.CONNECT_ERR);
    };
  }, []);

  return <SocketContext.Provider value={{ socket }} {...props} />;
}

export const useSocketInfo = () => useContext(SocketContext);
