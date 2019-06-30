export interface Action<PayloadType> {
  type: string,
  payload?: PayloadType
};

export interface Room {
  roomName: string
  users: string[]
};

export interface User {
  userSocketId: string,
  userNickName: string
};