import { Socket } from "socket.io";
import { get } from "lodash";
import { getFromRedis } from "../../services/redis/redis.service";

export const createPrivateRoomHandler = async (
  socket: Socket,
  username: string,
  cb
) => {
  console.log(username);
  try {
    if (username == get(socket, "user.username"))
      return cb({
        error: { message: "Can't Start Conversation with yourself!" },
      });
    const userFromRedis = await getFromRedis(username);
    if (userFromRedis) {
    } else {
    }
  } catch (error: any) {
    cb({ error });
  }
};

export const createNewRoomHandler = () => {};

export const getOneRoomHandler = () => {};

export const getAllUserRoomsHandler = () => {};

export const addMemberToRoomHandler = () => {};

export const deleteOneRoomHandler = () => {};
