import { User } from '../../redux/store/types';
import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';

// RoomsListItemStoreProps
export interface RoomsListItemStoreProps {
  isNicknameFree: (nickname: string) => boolean
}

export interface RoomsListitemDispatchProps {
  addUserToRoom: (newUser: User) => SocketIOActionTypes,
}
export interface RoomsListItemStandardProps {
  roomName: string
}
// roomsListItemState

export type RoomsListItemProps =
  RoomsListItemStoreProps &
  RoomsListitemDispatchProps &
  RoomsListItemStandardProps;