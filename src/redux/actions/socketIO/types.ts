import { Action } from '../../store/types';

export enum SocketIOActionTypesEnum {
  INIT = '@@INIT',
  CREATE_NEW_ROOM = 'CREATE_NEW_ROOM',
  DELETE_ROOM = 'DELETE_ROOM',
  SEND_ROOM_BROADCAST = 'SEND_ROOM_BROADCAST',
  SEND_MSG_TO_USER = 'SEND_MSG_TO_USER',
  ADD_USER_TO_ROOM = 'ADD_USER_TO_ROOM',
  DELETE_USER_FROM_ROOM = 'DELETE_USER_FROM_ROOM',
  SET_USER_DATA = 'SET_USER_DATA'
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

type CreateNewRoomAction = Action<{
  roomName: string,
  isFixed: boolean,
  isPrivate: boolean
}>;

type DeleteRoomAction = Action<{
  roomName: string
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
  DeleteUserFromRoomAction |
  CreateNewRoomAction |
  DeleteRoomAction;