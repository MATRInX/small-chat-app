import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../redux/store/types';
import * as Props from './types';
import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { Dispatch } from 'redux';
import { createNewRoom } from '../../redux/actions/socketIO/room';
import { AppState } from '../../redux/store/configureStore';
import getActualUser from '../../redux/selectors/getActualUser';
import { socket } from '../../index';

export const OnlineUsersItem = (props: Props.OnlineUsersItemProps) => {
  const { user, createPrivateRoom } = props;
  const onClick = () => {
    console.log('send invitation to ', user);
    createPrivateRoom(user, user);
  }
  return (
    <li>
      {user.nickname}
      <button onClick={onClick}>Priv</button>
    </li>
  )
}

const mapStateToProps: (state: AppState, ownProps: Props.OnlineUsersItemProps) => Props.OnlineUsersItemStoreProps =
  (store, ownProps) => ({
    actualUser: getActualUser(store.joinedUsers, socket.id)
  })

const mapDispatchToProps: (dispatch: Dispatch<SocketIOActionTypes>, ownProps: Props.OnlineUsersItemProps) => Props.OnlineUsersItemDispatchProps = 
  (dispatch, ownProps) => ({
    createPrivateRoom: (user: User, actualUser: User) => dispatch(createNewRoom(`private-${user.nickname}`, false, true))
  });

export default connect<AppState, Props.OnlineUsersItemDispatchProps, any, any>(null, mapDispatchToProps)(OnlineUsersItem);