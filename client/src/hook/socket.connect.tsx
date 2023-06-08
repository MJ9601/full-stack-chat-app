import { Socket } from "socket.io-client";
import EVENTS from "../utils/EVENTS";

export function useSocketConnect(socket: Socket) {
  socket.connect();
  socket.on(EVENTS.CONNECT_ERR, (err: any) => {
    console.log(err.message);
  });
  socket.off(EVENTS.CONNECT_ERR);

  return;
}
