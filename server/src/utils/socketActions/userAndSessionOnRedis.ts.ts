import { omit } from "lodash";
import {
  hGetAllFromRedis,
  hGetFromRedis,
  hSetOnRedis,
} from "../../services/redis/redis.service";
import { Session, User } from "@prisma/client";

export const getUserAndSessionFromRedis = async (
  userId: string,
  sessionId: string
) => {
  const userRedis = await hGetAllFromRedis(`user:${userId}`);
  const sessionIdRedis = await hGetFromRedis(`session:${sessionId}`, "id");

  return { userRedis, sessionIdRedis };
};

export const setUserAndSessionOnRedis = async (
  user: Omit<User, "password">,
  session: Session,
  ex?: number
) => {
  await hSetOnRedis(
    `user:${user.id}`,
    {
      ...omit(user, ["password"]),
      session: session.id,
    },
    ex && ex
  );

  await hSetOnRedis(`session:${session.id}`, session, ex && ex);
};
