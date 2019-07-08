import { User } from '../../redux/store/types';

// OnlineUsersStoreProps
export interface OnlineUsersStoreProps {
  users: User[]
}
// OnlineUsersDispatchProps
// OnlineUsersStandardProps
export interface OnlineUsersStandardProps {
  roomName: string
};
// OnlineUsersState

export type OnlineUsersProps = OnlineUsersStoreProps & OnlineUsersStandardProps;