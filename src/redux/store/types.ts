export interface Action<PayloadType> {
  type: string,
  payload?: PayloadType
};

export interface Message {
  nickname: string,
  message: string
}

export interface Room {
  roomName: string,
  isFixed: boolean,
  isPrivate: boolean,
  messages: Message[]
};

export interface User {
  socketId: string,
  nickname: string,
  roomName: string,
  isTyping: boolean
};

export type RoomState = Room[];

export type OnlineUserState = User[];