import { SocketIOActionTypesEnum, SocketIOActionTypes } from './types';

// Init action
export const socketInit: () => SocketIOActionTypes = () => ({
  type: SocketIOActionTypesEnum.INIT
});

// Add user to room
export const addUserToRoom: () => SocketIOActionTypes = () => ({
  type: SocketIOActionTypesEnum.ADD_USER_TO_ROOM
});

// delete user from room
export const deleteUserFromRoom: () => SocketIOActionTypes = () => ({
  type: SocketIOActionTypesEnum.DELETE_USER_FROM_ROOM
});

// send room broadcast
export const sendRoomBroadcast: () => SocketIOActionTypes = () => ({
  type: SocketIOActionTypesEnum.SEND_ROOM_BROADCAST
});

// send msg to user
export const sendMsgToUser: () => SocketIOActionTypes = () => ({
  type: SocketIOActionTypesEnum.SEND_MSG_TO_USER
});