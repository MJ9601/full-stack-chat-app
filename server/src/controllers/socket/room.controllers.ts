import { Socket } from "socket.io";
import { get } from "lodash";
import {
  getFromRedis,
  getListFromLeftOnRedis,
  hGetFromRedis,
} from "../../services/redis/redis.service";
import { Callback } from "ioredis";
import { findOneUser } from "../../services/user.service";
import { privateRoomExistChecking } from "../../utils/roomActions/roomExistChecking";
import logger from "../../utils/helper/logger";
import baseKey from "../../utils/helper/rediskeys.helper";
import EVENTS from "../../utils/helper/EVENTS";

export const createPrivateRoomHandler = async (
  socket: Socket,
  userFriend: string,
  cb: Callback
) => {
  // console.log(userFriend);
  // console.log(socket.id);
  try {
    if (userFriend == get(socket, "user.username")) {
      cb({
        name: "403",
        message: "Can't start Conversation with SELF!!",
      });
      return;
    }

    const username = get(socket, "user.username")!;

    const { err, results } = await privateRoomExistChecking(
      username,
      userFriend
    );
    if (!err) {
      const rooms = await getListFromLeftOnRedis(
        baseKey.ROOMS(username),
        0,
        -1
      );
      // socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);
      socket.emit(EVENTS.SERVER.ROOMS, rooms);

      socket.emit(EVENTS.SERVER.CUR_ROOM, results);
    }
    return cb(err, results);
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
