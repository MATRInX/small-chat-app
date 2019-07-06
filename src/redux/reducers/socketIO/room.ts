import { SocketIOActionTypesEnum } from '../../actions/socketIO/types';
import { RoomState } from '../../store/types';
import { Reducer } from 'redux';

const roomDefaultState: RoomState = {
  rooms: []
};

export const roomReducer: Reducer<RoomState> = 
  (state = roomDefaultState, action) => {
    let roomIndex: number = -1;
    state.rooms.forEach((room, index) => {
      if (room.roomName === action.payload.roomName) {
        roomIndex = index;
      }          
    });
    switch(action.type) {
      case SocketIOActionTypesEnum.CREATE_NEW_ROOM:
        return {
          rooms: [
            ...state.rooms,
            {
              roomName: action.payload.roomName,
              isFixed: action.payload.isFixed,
              isPrivate: action.payload.isPrivate
            }
          ]
        }
      case SocketIOActionTypesEnum.DELETE_ROOM:
        return {
          rooms: state.rooms.filter((room) => {
            if (room.roomName === action.payload.roomName) {
              return false;
            }
            return true;
          })
        }
      default:
        return {
          rooms: [
            ...state.rooms
          ]
        };
    }
  }