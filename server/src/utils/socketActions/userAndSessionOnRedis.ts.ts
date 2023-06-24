import { get, omit } from "lodash";
import {
  getListFromLeftOnRedis,
  hGetAllFromRedis,
  hGetFromRedis,
  hSetOnRedis,
  pushToListFromLeftOnRedis,
} from "../../services/redis/redis.service";
import { Session, User } from "@prisma/client";
import baseKey from "../helper/rediskeys.helper";
import { findManyUsers } from "../../services/user.service";

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
  const userRooms: object[] = get(user, "Room")!;


  await hSetOnRedis(
    baseKey.USER(user.username),
    {
      ...omit(user, ["password", "updatedAt", "createdAt", "Room"]),
      session: session.id,
    },
    ex && ex
  );

  if (userRooms.length !== 0) {
    const userRoomsOnRedis = await getListFromLeftOnRedis(
      baseKey.ROOMS(user.username),
      0,
      -1
    );

    if (!userRoomsOnRedis || userRoomsOnRedis.length == 0) {
      await pushToListFromLeftOnRedis(
        baseKey.ROOMS(user.username),
        userRooms.map((room) => JSON.stringify(room)),
        ex && ex
      );
    }
  }

  await hSetOnRedis(
    baseKey.SESSION(session.id),
    { ...omit(session, ["valid", "createdAt", "updatedAt"]) },
    ex && ex
  );
};

export const setUserEmailList = async (ex?: number) => {
  const users = await findManyUsers({
    where: {},
    select: { username: true },
  });

  const userEmails = users.map((user) => user.username);


  await pushToListFromLeftOnRedis(baseKey.USERS_LIST, userEmails, ex && ex);
};

export const getUserEmailList = async () =>
  await getListFromLeftOnRedis(baseKey.USERS_LIST, 0, -1);
