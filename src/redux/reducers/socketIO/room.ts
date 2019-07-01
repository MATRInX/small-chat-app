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
      case SocketIOActionTypesEnum.ADD_USER_TO_ROOM:
        if (roomIndex > -1) {
          state.rooms[roomIndex] = {
            roomName: state.rooms[roomIndex].roomName,
            users: [...state.rooms[roomIndex].users, action.payload.userId]
          }
          return {
            ...state
          }
        } else {
          return {
            rooms: [...state.rooms, {
              roomName: action.payload.roomName,
              users: [action.payload.userId]
            }]
          }
        } 
      case SocketIOActionTypesEnum.DELETE_USER_FROM_ROOM:
        state.rooms[roomIndex] = {
          roomName: state.rooms[roomIndex].roomName,
          users: [...state.rooms[roomIndex].users.filter((singleUser) => singleUser !== action.payload.userId)]
        }
        return {
          ...state
        }
      default:
        return {
          ...state
        };
    }
  }