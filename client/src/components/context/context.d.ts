import { Room, User } from "./chatInfo";

export interface AuthContext {
  logged?: string | boolean | User;
  setLogged: (input: boolean) => void;
  loading: boolean;
  hitLim: boolean;
  setHitLim: (input: boolean) => void;
}

export interface ChatContext {
  rooms: Room[] | [];
  setRooms: (input: Room[]) => void;
  curRoom?: Room | {};
  setCurRoom: (input: Room) => void;
}
