import { Server, Socket } from "socket.io";
import logger from "./logger";
import EVENTS from "./EVENTS";

import authSocket from "../middlewares/socket/authSocket.middleware";
import { get } from "lodash";
import stabilizerSocket from "../middlewares/socket/stabilizer.middleware";
import { createPrivateRoomHandler } from "../controllers/socket/room.controllers";
import { Callback } from "ioredis";

export default function socketConfig({ io }: { io: Server }) {
  logger.info("Sockets enbled!!");

  // io.engine.use((req, res, next) =>
  //   deserializeToken(req as Request, res as Response, next)
  // );
  // io.engine.use((req, res, next) =>
  //   requiredUser(req as Request, res as Response, next)
  // );
  io.use((socket: Socket, next) => authSocket(socket, next));
  io.use(stabilizerSocket);

  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    logger.info(`Socket id => ${socket.id} \n`);

    // create private chat
    socket.on(
      EVENTS.CLIENT.CREATE_ROOM,
      (socket: Socket) => (username: string, cb: Callback) =>
        createPrivateRoomHandler(socket, username, cb)
    );
  });
}
