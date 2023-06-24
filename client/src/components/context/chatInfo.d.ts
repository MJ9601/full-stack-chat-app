export interface User {
  id: string;
  username: string;

  Room?: Room[] | [];
  message?: Message[] | [];

  createdAt: Date;
  updatedAt: Date;
}

export interface Room {
  id: string;
  name: string;
  isPrivate: boolean;

  members?: User[] | [];
  msgs?: Message[] | [];

  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  msg: string;
  userId: string;
  msgId?: string;
  roomId: string;

  creater: User;
  message?: Message[] | [];
  Room: Room;
  msgReply?: Message;

  createdAt: Date;
  updatedAt: Date;
}
