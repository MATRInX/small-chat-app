import { SocketIOActionTypesEnum, SocketIOActionTypes } from './types';

// Init action
export const socketInit: () => SocketIOActionTypes = () => ({
  type: SocketIOActionTypesEnum.INIT
});

// Add user to room
export const addUserToRoom: (roomName: string, userId: string) => SocketIOActionTypes = 
  (roomName, userId) => ({
    type: SocketIOActionTypesEnum.ADD_USER_TO_ROOM,
    payload: {
      roomName,
      userId
    }
  });

// delete user from room
export const deleteUserFromRoom: (roomName: string, userId: string) => SocketIOActionTypes = 
  (roomName, userId) => ({
    type: SocketIOActionTypesEnum.DELETE_USER_FROM_ROOM,
    payload: {
      roomName,
      userId
    }
});

// send room broadcast
export const sendRoomBroadcast: (roomName: string, message: string) => SocketIOActionTypes = 
  (roomName, message) => ({
    type: SocketIOActionTypesEnum.SEND_ROOM_BROADCAST,
    payload: {
      roomName,
      message
    }
  });

// send msg to user
export const sendMsgToUser: (roomName: string, userId: string, message: string) => SocketIOActionTypes = 
  (roomName, userId, message) => ({
    type: SocketIOActionTypesEnum.SEND_MSG_TO_USER,
    payload: {
      roomName,
      userId,
      message
    }
  });