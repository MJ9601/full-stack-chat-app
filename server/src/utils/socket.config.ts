import { Server, Socket } from "socket.io";
import logger from "./helper/logger";
import EVENTS from "./helper/EVENTS";

import authSocket from "../middlewares/socket/authSocket.middleware";
import { get } from "lodash";
// import stabilizerSocket from "../middlewares/socket/stabilizer.middleware";
import {
  createNewRoomHandler,
  createPrivateRoomHandler,
  getOneRoomHandler,
} from "../controllers/socket/room.controllers";
import { Callback } from "ioredis";
import { createMsgHandler } from "../controllers/socket/message.controller";
// import { roomExistChecking } from "./roomActions/roomExistChecking";

export default function socketConfig({ io }: { io: Server }) {
  logger.info("Sockets enbled!!");

  io.use((socket: Socket, next) => authSocket(socket, next));

  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    logger.info(`Socket id => ${socket.id}`);

    

    // create private chat
    socket.on(EVENTS.CLIENT.CREATE_PRIVATE, (username: string, cb: Callback) =>
      createPrivateRoomHandler(socket, username, cb)
    );

    // // create new room
    // socket.on(
    //   EVENTS.CLIENT.CREATE_ROOM,
    //   (socket: Socket) => () => createNewRoomHandler()
    // );

    // // set current room
    // socket.on(
    //   EVENTS.CLIENT.SET_CUR_ROOM,
    //   (socket: Socket) => () => getOneRoomHandler()
    // );

    // // create msg
    // socket.on(
    //   EVENTS.CLIENT.CREATE_MSG,
    //   (socket: Socket) => () => createMsgHandler()
    // );
  });
}
