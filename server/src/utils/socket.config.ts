import { Server, Socket } from "socket.io";
import logger from "./logger";
import EVENTS from "./EVENTS";

import deserializeToken from "../middlewares/deserializeToken.middleware";
import requiredUser from "../middlewares/requiredUser.middleware";
import deserializeTokenSocket from "../middlewares/socket/deserializeTokenSocket.middleware";
import { Request, Response } from "express";

export default function socketConfig({ io }: { io: Server }) {
  logger.info("Sockets enbled!!");

  io.engine.use((req, res, next) =>
    deserializeToken(req as Request, res as Response, next)
  );
  // io.engine.use((req, res, next) =>
  //   requiredUser(req as Request, res as Response, next)
  // );
  // io.use(deserializeTokenSocket)

  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    logger.info(`User connected, socket id => ${socket.id}`);
  });
}
