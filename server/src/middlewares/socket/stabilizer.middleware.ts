import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

export default async function stabilizerSocket(
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) {
  // const email = get(socket, "user.username")! as string;
  // logger.info(`username => ${email}`);
  // await redisClient!.set(email, get(socket, "user.id")!);
  // await setOnRedis(email, get(socket, "user.id")!, 16 * 60);

  next();
}
