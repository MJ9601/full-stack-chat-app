const baseKey = {
  CUR_ROOM: (username: string) => `curRoom:${username}`,
  ROOMS: (username: string) => `rooms:${username}`,
  USERS_LIST: "userslist",
  USER: (username: string) => `user:${username}`,
  SESSION: (sessionId: string) => `session:${sessionId}`,
  MSGS:(roomId:string) => `roomMsgs:${roomId}`,
};

export default baseKey;
