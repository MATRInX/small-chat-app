export interface Action<PayloadType> {
  type: string,
  payload?: PayloadType
};

export interface Room {
  roomName: string,
  isFixed: boolean,
  isPrivate: boolean
};

export interface User {
  socketId: string,
  nickname: string,
  roomName: string
};

export type RoomState = Room[];

export type OnlineUserState = User[];