import express from "express";
import "dotenv/config";
import { Server } from "socket.io";
import helmet from "helmet";
import { createServer } from "http";
import cors from "cors";
import config from "config";
import cookieParser from "cookie-parser";
import { version } from "../../package.json";
import socketConfig from "./socket.config";
import logger from "./helper/logger";

export default async function serverConfig() {
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

  io.engine.use(helmet());

  app.use(helmet());
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({ origin, credentials: true }));

  socketConfig({ io });

  server.listen(port, () =>
    logger.info(
      `Server with VERSION of ${version} is listening on PORT ${port}`
    )
  );

  return { server, app };
}
