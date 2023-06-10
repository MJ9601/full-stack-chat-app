import { omit } from "lodash";
import {
  hGetAllFromRedis,
  hGetFromRedis,
  hSetOnRedis,
} from "../../services/redis/redis.service";
import { Session, User } from "@prisma/client";

export const getUserAndSessionFromRedis = async (
  username: string,
  sessionId: string
) => {
  const userRedis = await hGetAllFromRedis(`user:${username}`);
  const sessionIdRedis = await hGetFromRedis(`session:${sessionId}`, "id");

  return { userRedis, sessionIdRedis };
};

export const setUserAndSessionOnRedis = async (
  user: Omit<User, "password">,
  session: Session,
  ex?: number
) => {
  await hSetOnRedis(
    `user:${user.username}`,
    {
      ...omit(user, ["password", "updatedAt", "createdAt"]),
      session: session.id,
    },
    ex && ex
  );

  await hSetOnRedis(
    `session:${session.id}`,
    { ...omit(session, ["valid", "createdAt", "updatedAt"]) },
    ex && ex
  );
};
