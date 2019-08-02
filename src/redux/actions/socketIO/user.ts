import { SocketIOActionTypesEnum, SocketIOActionTypes } from './types';

// // set user data
//   export const setUserData: (userId: string, userNickname: string) => SocketIOActionTypes = 
//   (userId, userNickname) => ({
//     type: SocketIOActionTypesEnum.SET_USER_DATA,
//     payload: {
//       userId,
//       userNickname
//     }
//   });

  // Add user to room
export const addUserToRoom: (roomName: string, socketId: string, nickname: string) => SocketIOActionTypes = 
(roomName, socketId, nickname) => ({
  type: SocketIOActionTypesEnum.ADD_USER_TO_ROOM,
  payload: {
    roomName,
    socketId,
    nickname
  }
});

// delete user from room
export const deleteUserFromRoom: (roomName: string, socketId: string) => SocketIOActionTypes = 
(roomName, socketId) => ({
  type: SocketIOActionTypesEnum.DELETE_USER_FROM_ROOM,
  payload: {
    roomName,
    socketId
  }
});

// delete user from all rooms
export const deleteUser: (socketId: string) => SocketIOActionTypes = 
(socketId) => ({
  type: SocketIOActionTypesEnum.DELETE_USER,
  payload: {
    socketId
  }
});

// set user typing
export const setUserTyping: (roomName: string, nickname: string, isTyping: boolean) => SocketIOActionTypes =
(roomName, nickname, isTyping) => ({
  type: SocketIOActionTypesEnum.SET_USER_TYPING,
  payload: {
    roomName,
    nickname,
    isTyping
  }
});