import { Socket } from "socket.io";
import { get } from "lodash";
import { getFromRedis } from "../../services/redis/redis.service";
import { Callback } from "ioredis";

export const createPrivateRoomHandler = async (
  socket: Socket,
  username: string,
  cb: Callback
) => {
  console.log(username);
  try {
    if (username == get(socket, "user.username"))
      return cb(
        { name: "403", message: "Can't start Conversation with SELF!!" },
        null
      );

    const _userRoomFromRedis = await getFromRedis(`rooms:${username}`);
    if (_userRoomFromRedis) {
      const userRoomFromRedis = JSON.parse(_userRoomFromRedis);
      console.log(userRoomFromRedis);
      return cb({ name: "403", message: "Room already exists!!" });
    }

    const userFromRedis = await getFromRedis(username);
    if (!userFromRedis) {
      // const
    } else {
    }
  } catch (error: any) {
    cb({ name: error.response.status, message: error.message });
  }
};

export const createNewRoomHandler = () => {};

export const getOneRoomHandler = () => {};

export const getAllUserRoomsHandler = () => {};

export const addMemberToRoomHandler = () => {};

export const deleteOneRoomHandler = () => {};
