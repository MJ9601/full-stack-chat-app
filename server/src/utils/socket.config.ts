import { Server, Socket } from "socket.io";
import logger from "./logger";
import EVENTS from "./EVENTS";

import authSocket from "../middlewares/socket/authSocket.middleware";

export default function socketConfig({ io }: { io: Server }) {
  logger.info("Sockets enbled!!");

  // io.engine.use((req, res, next) =>
  //   deserializeToken(req as Request, res as Response, next)
  // );
  // io.engine.use((req, res, next) =>
  //   requiredUser(req as Request, res as Response, next)
  // );
  io.use((socket: Socket, next) => authSocket(socket, next));

  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    logger.info(`User connected, socket id => ${socket.id}`);
  });
}
