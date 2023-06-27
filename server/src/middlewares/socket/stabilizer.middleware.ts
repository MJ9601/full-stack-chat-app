import { get } from "lodash";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import logger from "../../utils/helper/logger";
import { getListFromLeftOnRedis } from "../../services/redis/redis.service";
import baseKey from "../../utils/helper/rediskeys.helper";
import EVENTS from "../../utils/helper/EVENTS";
import {
  getFriendsFromPriRoomList,
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
      // logger.info({ rooms });
      socket.emit(EVENTS.SERVER.ROOMS, rooms);
    }

    let emailList = await getUserEmailList();

    if (!emailList || emailList.length == 0) {
      await setUserEmailList(10 * 60);
      emailList = await getUserEmailList();
    }

    socket.emit(EVENTS.SERVER.EMAILS, emailList);

    const friendList = await getFriendsFromPriRoomList(
      get(socket, "user.username")!
    );

    if (friendList.length > 0)
      socket
        .to(friendList)
        .emit(EVENTS.SERVER.CONNECTED, true, get(socket, "user.username"));

    next();
  } catch (err: any) {
    next(new Error(err.message));
  }
}
