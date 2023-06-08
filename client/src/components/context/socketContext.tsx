import { io, Socket } from "socket.io-client";
import EVENTS from "../../utils/EVENTS";
import constants from "../../utils/constants";
// import { socketConnection } from "../../hook/socket.connect";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { useAuth } from "./authContext";

interface Context {
  socket: Socket;
}

const socket = io(constants.socketUrl, {
  autoConnect: false,
  withCredentials: true,
});

const SocketContext = createContext<Context>({ socket });

export default function SocketProvider(props: any) {
  const { setLogged } = useAuth();

  // init socket connection.
  useEffect(() => {
    // const socketConnection = () => {
    socket.connect();
    socket.on(EVENTS.CONNECT_ERR, (err: any) => {
      console.log(err.message);
    });
    return () => {
      socket.off(EVENTS.CONNECT_ERR);
    };
    // };
    // socketConnection();
  }, []);

  return <SocketContext.Provider value={{ socket }} {...props} />;
}

export const useSocketInfo = () => useContext(SocketContext);
