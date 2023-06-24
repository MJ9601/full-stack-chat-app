import { Room } from "@prisma/client";
import {
  getFromRedis,
  getListFromLeftOnRedis,
  hGetFromRedis,
  pushToListFromLeftOnRedis,
  setOnRedis,
} from "../../services/redis/redis.service";
import {
  createRoom,
  findOneRoomByName,
  findRooms,
  updateOneRoom,
} from "../../services/room.service";
import { findOneUser } from "../../services/user.service";
import createRandomId from "../helper/randomIdGen";
import baseKey from "../helper/rediskeys.helper";

export const privateRoomExistChecking = async (
  username: string,
  friendUsername: string
) => {
  // check for friend on Redis
  //  => on false  => check on MySql => on false return err!
  //   => on true continue.
  //   check the user's rooms on Redis
  //  => on false => fetch from MySql
  // => on true => filter room for friendUserid
  //  on false => create new private room
  //  on true => return the room and set it as current room

  const userId = await hGetFromRedis(baseKey.USER(username), "id");
  let friendId = await hGetFromRedis(baseKey.USER(friendUsername), "id");
  // console.log(friendId);

  if (!friendId) {
    const _friendFromMySql = await findOneUser({
      where: { username: friendUsername },
    });
    if (!_friendFromMySql)
      return {
        err: { name: "404", message: "User Not Found!!" },
        results: null,
      };

    friendId = _friendFromMySql.id;
  }

  let privateRoom = {} as Room | null;

  // get user's rooms from redis
  let userRooms: string[] | Room[] | null | undefined =
    await getListFromLeftOnRedis(baseKey.ROOMS(username), 0, -1);

  console.log("line 56 ----");
  console.log(userRooms);

  if (!userRooms || userRooms.length == 0) {
    privateRoom = await findOneRoomByName({
      where: { name: `${userId}-${friendId}` || `${friendId}-${userId}` },
    });

    console.log("line 63 ---");
    console.log({ privateRoom });

    if (privateRoom) {
      await pushToListFromLeftOnRedis(baseKey.ROOMS(username), [
        JSON.stringify(privateRoom),
      ]);

      await setOnRedis(
        baseKey.CUR_ROOM(username),
        JSON.stringify(privateRoom),
        15 * 60
      );

      console.log("line 75 ---");
      console.log({ privateRoom });
      return { err: null, results: privateRoom };
    }
  }

  if (userRooms && userRooms.length !== 0) {
    userRooms = userRooms.map((room) => JSON.parse(room)) as Room[];
    privateRoom = userRooms.filter(
      (room) =>
        room.name == `${userId}-${friendId}` ||
        room.name == `${friendId}-${userId}`
    )[0];

    console.log("line 91 ---");
    console.log({ privateRoom });

    if (privateRoom && Object.keys(privateRoom!).length != 0) {
      console.log("line 93 ---");
      await setOnRedis(
        baseKey.CUR_ROOM(username),
        JSON.stringify(privateRoom),
        15 * 60
      );
      return { err: null, results: privateRoom };
    }

    console.log("line 97 ---");
  }

  privateRoom = await createRoom({
    data: {
      name: `${userId}-${friendId}`,
      redisId: createRandomId(15),
      isPrivate: true,
      members: {
        connect: [{ id: userId! }, { id: friendId }],
      },
    },
    include: { members: { select: { id: true, username: true } } },
  });

  console.log("line 109 ---");
  console.log({ privateRoom });

  if (!privateRoom)
    return {
      err: { name: "500", message: "Something went wrong in Database!!" },
      results: null,
    };

  await setOnRedis(
    baseKey.CUR_ROOM(username),
    JSON.stringify(privateRoom),
    15 * 60
  );
  await pushToListFromLeftOnRedis(
    baseKey.ROOMS(username),
    [JSON.stringify(privateRoom)],
    15 * 60
  );

  return { err: null, results: privateRoom };
};
