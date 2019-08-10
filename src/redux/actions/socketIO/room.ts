import { SocketIOActionTypesEnum, SocketIOActionTypes } from './types';
import { User } from '../../store/types';

// Init action
export const socketInit: () => SocketIOActionTypes = () => ({
  type: SocketIOActionTypesEnum.INIT
});

export const createNewRoom: (roomName: string, isFixed: boolean, isPrivate: boolean) => SocketIOActionTypes =
(roomName, isFixed, isPrivate) => ({
  type: SocketIOActionTypesEnum.CREATE_NEW_ROOM,
  payload: {
    roomName,
    isFixed,
    isPrivate
  }
});

export const deleteRoom: (roomName: string) => SocketIOActionTypes =
(roomName) => ({
  type: SocketIOActionTypesEnum.DELETE_ROOM,
  payload: {
    roomName
  }
});

// // send room broadcast
// export const sendRoomBroadcast: (roomName: string, message: string) => SocketIOActionTypes =
//   (roomName, message) => ({
//     type: SocketIOActionTypesEnum.SEND_ROOM_BROADCAST,
//     payload: {
//       roomName,
//       message
//     }
//   });

// // send msg to user
// export const sendMsgToUser: (roomName: string, userId: string, message: string) => SocketIOActionTypes =
//   (roomName, userId, message) => ({
//     type: SocketIOActionTypesEnum.SEND_MSG_TO_USER,
//     payload: {
//       roomName,
//       userId,
//       message
//     }
//   });