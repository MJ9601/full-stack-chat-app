import { omit } from "lodash";
import {
  hGetAllFromRedis,
  hGetFromRedis,
  hSetOnRedis,
} from "../../services/redis/redis.service";
import { Session, User } from "@prisma/client";
import baseKey from "../helper/rediskeys.helper";

export const getUserAndSessionFromRedis = async (
  username: string,
  sessionId: string
) => {
  const userRedis = await hGetAllFromRedis(baseKey.USER(username));
  const sessionIdRedis = await hGetFromRedis(baseKey.SESSION(sessionId), "id");

  return { userRedis, sessionIdRedis };
};

export const setUserAndSessionOnRedis = async (
  user: Omit<User, "password">,
  session: Session,
  ex?: number
) => {
  await hSetOnRedis(
    baseKey.USER(user.username),
    {
      ...omit(user, ["password", "updatedAt", "createdAt"]),
      session: session.id,
    },
    ex && ex
  );

  await hSetOnRedis(
    baseKey.SESSION(session.id),
    { ...omit(session, ["valid", "createdAt", "updatedAt"]) },
    ex && ex
  );
};
