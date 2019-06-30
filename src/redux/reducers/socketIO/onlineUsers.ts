import { SocketIOActionTypesEnum } from '../../actions/socketIO/types';
import { OnlineUsersState } from '../../store/types';
import { Reducer } from 'redux';

const roomDefaultState: OnlineUsersState = {
  users: []
};