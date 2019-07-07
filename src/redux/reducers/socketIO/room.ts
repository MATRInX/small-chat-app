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
            isPrivate: action.payload.isPrivate
          }
        ]
      case SocketIOActionTypesEnum.DELETE_ROOM:
        return state.filter((room) => {
          if (room.roomName === action.payload.roomName) {
            return false;
          }
          return true;
        })
      default:
        return [
            ...state
          ];
    }
  }