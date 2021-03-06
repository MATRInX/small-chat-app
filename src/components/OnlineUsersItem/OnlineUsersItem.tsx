import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../redux/store/types';
import * as Props from './types';
import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { Dispatch } from 'redux';
import { createNewRoom } from '../../redux/actions/socketIO/room';
import { addUserToRoom } from '../../redux/actions/socketIO/user';
import { AppState } from '../../redux/store/configureStore';
import getActualUser from '../../redux/selectors/getActualUser';
import { socket } from '../../index';
import Socket from '../../socket/index';
import isRoomPrivate from '../../redux/selectors/isRoomPrivate';

export const OnlineUsersItem = (props: Props.OnlineUsersItemProps) => {
  const { user, createPrivateRoom, actualUser , addUserToPrivateRoom } = props;
  const onClick = () => {
    const roomName: string = `priv-from: ${actualUser.nickname} to ${user.nickname}`;
    const newUser:User = {
      ...actualUser,
      roomName
    }
    createPrivateRoom(roomName);
    Socket.to.joinRoom(newUser);
    addUserToPrivateRoom(roomName, newUser);
    Socket.to.emitPrivInvitation(actualUser, user, roomName);
  }
  return (
    <li>
      {user.nickname}
      {
        props.actualUser.nickname !== user.nickname && !props.isRoomPrivate ? (
          <button className="btn btn--priv" onClick={onClick}>Priv</button>
        ) : (<span></span>)
      }
    </li>
  )
}

const mapStateToProps: (state: AppState, ownProps: Props.OnlineUsersItemProps) => Props.OnlineUsersItemStoreProps =
  (store, ownProps) => ({
    actualUser: getActualUser(store.joinedUsers, socket.id),
    isRoomPrivate: isRoomPrivate(store.rooms, ownProps.user.roomName)
  })

const mapDispatchToProps: (dispatch: Dispatch<SocketIOActionTypes>, ownProps: Props.OnlineUsersItemProps) => Props.OnlineUsersItemDispatchProps =
  (dispatch, ownProps) => ({
    createPrivateRoom: (roomName: string) => dispatch(createNewRoom(roomName, false, true)),
    addUserToPrivateRoom: (roomName:string, newUser: User) => dispatch(addUserToRoom(roomName, newUser.socketId, newUser.nickname))
  });

export default connect<Props.OnlineUsersItemStoreProps, Props.OnlineUsersItemDispatchProps, any, any>
  (mapStateToProps, mapDispatchToProps)(OnlineUsersItem);