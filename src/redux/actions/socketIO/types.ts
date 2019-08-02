import { Action } from '../../store/types';
import { User } from '../../store/types';

export enum SocketIOActionTypesEnum {
  INIT = '@@INIT',
  CREATE_NEW_ROOM = 'CREATE_NEW_ROOM',
  DELETE_ROOM = 'DELETE_ROOM',
  SEND_ROOM_BROADCAST = 'SEND_ROOM_BROADCAST',
  SEND_MSG_TO_USER = 'SEND_MSG_TO_USER',
  ADD_USER_TO_ROOM = 'ADD_USER_TO_ROOM',
  DELETE_USER = 'DELETE_USER',
  DELETE_USER_FROM_ROOM = 'DELETE_USER_FROM_ROOM',
  SET_USER_DATA = 'SET_USER_DATA',
  SET_USER_TYPING = 'SET_USER_TYPING'
};

type SocketIOInitAction = Action<{}>;

type AddUserToRoomAction = Action<{
  roomName: string,
  socketId: string,
  nickname: string
}>;

type DeleteUserFromRoomAction = Action<{
  roomName: string,
  socketId: string
}>;

type DeleteUserAction = Action<{
  socketId: string
}>;

type CreateNewRoomAction = Action<{
  roomName: string,
  isFixed: boolean,
  isPrivate: boolean
}>;

type DeleteRoomAction = Action<{
  roomName: string,
  usersInRoom: User[]
}>;

type SetUserTypings = Action<{
  roomName: string,
  nickname: string,
  isTyping: boolean
}>;

// type SendRoomBroadcastAction = Action<{
//   roomName: string,
//   message: string
// }>;

// type SendMsgToUserAction = Action<{
//   roomName: string,
//   userId: string,
//   message: string
// }>;

// type SetUserData = Action<{
//   userId: string,
//   userNickname: string
// }>

export type SocketIOActionTypes = 
  SocketIOInitAction |
  AddUserToRoomAction |
  DeleteUserAction |
  DeleteUserFromRoomAction |
  CreateNewRoomAction |
  DeleteRoomAction |
  SetUserTypings;