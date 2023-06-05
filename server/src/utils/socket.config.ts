import { Server, Socket } from "socket.io";
import logger from "./logger";
import EVENTS from "./EVENTS";

export default function socketConfig({ io }: { io: Server }) {
  logger.info("Sockets enbled!!");
  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    logger.info(`User connected, socket id => ${socket.id}`);
  });
}
