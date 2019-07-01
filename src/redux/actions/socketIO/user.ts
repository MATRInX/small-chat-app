import { SocketIOActionTypesEnum, SocketIOActionTypes } from './types';

// set user data
  export const setUserData: (userId: string, userNickname: string) => SocketIOActionTypes = 
  (userId, userNickname) => ({
    type: SocketIOActionTypesEnum.SET_USER_DATA,
    payload: {
      userId,
      userNickname
    }
  });