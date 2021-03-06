import { SocketIOActionTypesEnum } from '../../actions/socketIO/types';
import { OnlineUserState } from '../../store/types';
import { Reducer } from 'redux';

const userDefaultState: OnlineUserState = [];

export const userReducer: Reducer<OnlineUserState> =
  (state = userDefaultState, action) => {
    switch(action.type) {
      case SocketIOActionTypesEnum.ADD_USER_TO_ROOM:
        let isUserNew: boolean = true;
        for(let i=0; i<state.length; i++){
          if ((state[i].nickname === action.payload.nickname) &&
          (state[i].roomName === action.payload.roomName) &&
          (state[i].socketId === action.payload.socketId)) {
            isUserNew = false;
            break;
          }
        }
        if (isUserNew) {
          return [
            ...state,
            {
              roomName: action.payload.roomName,
              socketId: action.payload.socketId,
              nickname: action.payload.nickname,
              isTyping: false
            }
          ]
        } else {
          return state;
        }
      case SocketIOActionTypesEnum.DELETE_USER_FROM_ROOM:
        return state.filter((user) => {
          if ((user.roomName === action.payload.roomName)
             && (user.socketId === action.payload.socketId)) {
               return false;
             }
          return true;
        });
      case SocketIOActionTypesEnum.DELETE_USER:
        return state.filter((user) => {
          if (user.socketId === action.payload.socketId) {
               return false;
             }
          return true;
        });
      case SocketIOActionTypesEnum.SET_USER_TYPING:
        return state.map(user => {
            return {...user,
              isTyping:
              ((user.nickname === action.payload.nickname) &&
               (user.roomName === action.payload.roomName)) ? action.payload.isTyping : user.isTyping
            };
        });
      default:
        return [
          ...state
        ]
    }
  }