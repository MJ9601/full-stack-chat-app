import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { set, get } from "lodash";
import redisClient from "../../database/redis.config";
import logger from "../../utils/logger";

export default async function stabilizerSocket(
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) {
  const email = get(socket, "user.username")! as string;
  logger.info(`username => ${email}`);
  await redisClient!.hset(email, { key: email });

  next();
}
