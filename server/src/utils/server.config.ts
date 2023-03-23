import express from "express";
import "dotenv/config";
import { Server } from "socket.io";
import helmet from "helmet";
import { createServer } from "http";
import cors from "cors";
import config from "config";
import logger from "./logger";

export default function serverConfig() {
  const app = express();

  const server = createServer(app);

  const port = config.get("port");
  const origin = config!.get<string>("origin");

  const io = new Server(server, {
    cors: {
      origin,
      credentials: true,
    },
  });

  app.use(helmet());
  app.use(express.json());
  app.use(cors({ origin }));

  io.on("connect", (socket) => {});

  server.listen(port, () => logger.info(`Server is listening on PORT ${port}`));

  return { server, app };
}
