import { SocketIOActionTypesEnum } from '../../actions/socketIO/types';
import { User } from '../../store/types';
import { Reducer } from 'redux';

const userDefaultState: User = {
  userSocketId: '',
  userNickName: ''
};

export const userReducer: Reducer<User> = 
  (state= userDefaultState, action) => {
    switch(action.type) {
      case SocketIOActionTypesEnum.SET_USER_DATA:
        return {
          ...state,
          userSocketId: action.payload.userId,
          userNickName: action.payload.userNickName
        }
      default: 
        return {
          ...state
        }
    }
  }