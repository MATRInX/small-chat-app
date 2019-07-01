import { Action } from '../../store/types';

export enum SocketIOActionTypesEnum {
  INIT = '@@INIT',
  ADD_USER_TO_ROOM = 'ADD_USER_TO_ROOM',
  DELETE_USER_FROM_ROOM = 'DELETE_USER_FROM_ROOM',
  SEND_ROOM_BROADCAST = 'SEND_ROOM_BROADCAST',
  SEND_MSG_TO_USER = 'SEND_MSG_TO_USER',
  SET_USER_DATA = 'SET_USER_DATA'
};

type SocketIOInitAction = Action<{}>;

type AddUserToRoomAction = Action<{
  roomName: string,
  userId: string
}>;

type DeleteUserFromRoomAction = Action<{
  roomName: string,
  userId: string
}>;

type SendRoomBroadcastAction = Action<{
  roomName: string,
  message: string
}>;

type SendMsgToUserAction = Action<{
  roomName: string,
  userId: string,
  message: string
}>;

type SetUserData = Action<{
  userId: string,
  userNickname: string
}>

export type SocketIOActionTypes = 
  SocketIOInitAction |
  AddUserToRoomAction |
  DeleteUserFromRoomAction |
  SendRoomBroadcastAction |
  SendMsgToUserAction |
  SetUserData;