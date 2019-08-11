import { SocketIOActionTypesEnum } from '../../actions/socketIO/types';
import { RoomState } from '../../store/types';
import { Reducer } from 'redux';

const roomDefaultState: RoomState = [];

export const roomReducer: Reducer<RoomState> =
  (state = roomDefaultState, action) => {
    switch(action.type) {
      case SocketIOActionTypesEnum.CREATE_NEW_ROOM:
        return [
          ...state,
          {
            roomName: action.payload.roomName,
            isFixed: action.payload.isFixed,
            isPrivate: action.payload.isPrivate,
            messages: []
          }
        ]
      case SocketIOActionTypesEnum.DELETE_ROOM:
        return state.filter((room) => {
          if (!room.isFixed &&
              room.roomName === action.payload.roomName) {
            return false;
          }
          return true;
        })
      case SocketIOActionTypesEnum.ADD_NEW_MESSAGE:
        const newState = state.map(room => {
          if (room.roomName === action.payload.roomName) {
            room.messages = [...room.messages, {
              nickname: action.payload.nickname,
              message: action.payload.message
            }]
            return room;
          } else {
            return room;
          }
        });
        return newState;
      default:
        return [
            ...state
          ];
    }
  }