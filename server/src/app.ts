import express from "express";
import "dotenv/config";
import { Server } from "socket.io";
import helmet from "helmet";
import { createServer } from "http";
import config from "config";
import logger from "./utils/logger";

const app = express();

const server = createServer(app);

const port = config.get("port") || 4001;
const origin = config!.get<string>("origin") || "http://localhost:3000";

const io = new Server(server, {
  cors: {
    origin,
    credentials: true,
  },
});

app.use(helmet());
app.use(express.json());

// test api
app.get("/", (_, res: express.Response) => res.sendStatus(200));

io.on("connect", (socket) => {});

server.listen(port, () => logger.info(`Server is listening on PORT ${port}`));
