import { get } from "lodash";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import logger from "../../utils/helper/logger";
import { getListFromLeftOnRedis } from "../../services/redis/redis.service";
import baseKey from "../../utils/helper/rediskeys.helper";
import EVENTS from "../../utils/helper/EVENTS";
import {
  getUserEmailList,
  setUserEmailList,
} from "../../utils/socketActions/userAndSessionOnRedis.ts";

export default async function stabilizerSocket(
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) {
  const username = get(socket, "user.username")!;
  try {
    const userRooms = await getListFromLeftOnRedis(
      baseKey.ROOMS(username),
      0,
      -1
    );

    if (userRooms) {
      const rooms = userRooms.map((room) => JSON.parse(room));
      socket.emit(EVENTS.SERVER.ROOMS, rooms);
    }

    let emailList = await getUserEmailList();

    if (!emailList) {
      await setUserEmailList(10 * 60);
      emailList = await getUserEmailList();
    }

    socket.emit(EVENTS.SERVER.EMAILS, emailList);
    next();
  } catch (err: any) {
    next(new Error(err.message));
  }
}
