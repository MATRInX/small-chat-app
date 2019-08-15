import { User } from '../../redux/store/types';
import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';

// RoomsListItemStoreProps
export interface RoomsListitemDispatchProps {
  addUserToRoom: (newUser: User) => SocketIOActionTypes,
}
export interface RoomsListItemStandardProps {
  roomName: string
}
// roomsListItemState

export type RoomsListItemProps = RoomsListitemDispatchProps & RoomsListItemStandardProps;