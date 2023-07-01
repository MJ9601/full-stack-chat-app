import { Socket } from "socket.io";
import {
  getFriendsFromPriRoomList,
  removeUserAndSessionFromRedis,
} from "../../utils/socketActions/userAndSessionOnRedis.ts";
import { get } from "lodash";
import EVENTS from "../../utils/helper/EVENTS";

export const getOneUserHandler = () => {};
export const searchOnUserListHandler = () => {};

export const updateUserStatusHandler = async (socket: Socket) => {
  const username = get(socket, "user.username")!;
  const sessionId = get(socket, "user.session")!;
  const { friendList } = await getFriendsFromPriRoomList(username);

  // if (friendList!.length > 0)
  //   socket
  //     .to(friendList!)
  //     .emit(EVENTS.SERVER.CONNECTED, false, get(socket, "user.id"));

  await removeUserAndSessionFromRedis({ username, sessionId });
};
