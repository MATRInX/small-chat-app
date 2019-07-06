import { SocketIOActionTypesEnum } from '../../actions/socketIO/types';
import { OnlineUserState } from '../../store/types';
import { Reducer } from 'redux';

const userDefaultState: OnlineUserState = {
  joinedUsers: []
};

export const userReducer: Reducer<OnlineUserState> = 
  (state = userDefaultState, action) => {
    switch(action.type) {
      case SocketIOActionTypesEnum.ADD_USER_TO_ROOM:
        return {
          joinedUsers: [
            ...state.joinedUsers,
            { 
              roomName: action.payload.roomName,
              socketId: action.payload.socketId,
              nickname: action.payload.nickname
            }
          ]
        }
      case SocketIOActionTypesEnum.DELETE_USER_FROM_ROOM:
        return {
          joinedUsers: state.joinedUsers.filter((user) => {
          if ((user.roomName === action.payload.roomName) &&
             (user.socketId === action.payload.socketId)) {
               return false;
             }
          return true;
        })
      }
      default: 
        return {
          joinedUsers: [
            ...state.joinedUsers
          ]
        }
    }
  }