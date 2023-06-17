import { Socket } from "socket.io";
import { get } from "lodash";
import {
  getFromRedis,
  hGetFromRedis,
} from "../../services/redis/redis.service";
import { Callback } from "ioredis";
import { findOneUser } from "../../services/user.service";
import { roomExistChecking } from "../../utils/roomActions/roomExistChecking";
import logger from "../../utils/logger";

export const createPrivateRoomHandler = async (
  socket: Socket,
  userFriend: string,
  cb: Callback
) => {
  console.log(userFriend);
  console.log(socket.id);
  try {
    if (userFriend == get(socket, "user.username")) {
      cb({
        name: "403",
        message: "Can't start Conversation with SELF!!",
      });
      return;
    }

    const username = get(socket, "user.username")!;
    const friendIdFromRedis = await hGetFromRedis(userFriend, "id");
    if (!friendIdFromRedis) {
      const _userFriend = await findOneUser({
        where: { username: userFriend },
      });
      if (!_userFriend)
        return cb({
          name: "404",
          message: "No one with That email found!!",
        });
    } else {
    }

    roomExistChecking(username, userFriend);

    const _userRoomFromRedis = await getFromRedis(`rooms:${username}`);
    if (_userRoomFromRedis) {
      const userRoomFromRedis = JSON.parse(_userRoomFromRedis);
      console.log(userRoomFromRedis);
      return cb({ name: "403", message: "Room already exists!!" }, null);
    }
  } catch (error: any) {
    logger.error(error);

    cb({ name: "403", message: error.message });
  }
};

export const createNewRoomHandler = () => {};

export const getOneRoomHandler = () => {};

export const getAllUserRoomsHandler = () => {};

export const addMemberToRoomHandler = () => {};

export const deleteOneRoomHandler = () => {};
