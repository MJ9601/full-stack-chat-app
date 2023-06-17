import {
  getFromRedis,
  getListFromLeftOnRedis,
  hGetFromRedis,
  pushToListFromLeftOnRedis,
} from "../../services/redis/redis.service";
import { findOneUser } from "../../services/user.service";

export const roomExistChecking = async (
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

  // let friendId = await hGetFromRedis(friendUsername, "id");
  // if (!friendId) {
  //   const _friendFromMySql = await findOneUser({
  //     where: { username: friendUsername },
  //   });
  //   if (!_friendFromMySql)
  //     return {
  //       err: { name: "404", message: "user not Found!!" },
  //       results: null,
  //     };

  //   friendId = _friendFromMySql.id;
  // }

  // testing
  const testRooms = [
    {
      roomId: "0000",
      name: "name1",
      redisId: "000",
      members: ["001", "002", "003", "004"],
    },
    {
      roomId: "0001",
      name: "name2",
      redisId: "000",
      members: ["001", "002", "003", "004"],
    },
    {
      roomId: "0003",
      name: "name3",
      redisId: "000",
      members: ["001", "002", "003", "004"],
    },
  ];

  const _testRooms = testRooms.map((room) => JSON.stringify(room));
  await pushToListFromLeftOnRedis(`rooms:${username}`, _testRooms);

  // let usersRooms = await getListFromLeftOnRedis(`rooms:${username}`, 0, -1);
};
