import { Room, User } from '../../redux/store/types';

// RoomsListStoreProps
// RoomsListDispatchProps
export interface RoomsListStandardProps {
  rooms: Room[],
  users: User[]
};
// RoomsListState

export type RoomsListProps = RoomsListStandardProps;