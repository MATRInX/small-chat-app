import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../redux/store/types';
import {OnlineUsersStandardProps, OnlineUsersItemDispatchProps, OnlineUsersItemProps } from './types';
import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { Dispatch } from 'redux';
import { createNewRoom } from '../../redux/actions/socketIO/room';
import { AppState } from '../../redux/store/configureStore';

export const OnlineUsersItem = (props: OnlineUsersItemProps) => {
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

const mapDispatchToProps: (dispatch: Dispatch<SocketIOActionTypes>, ownProps: OnlineUsersItemProps) => OnlineUsersItemDispatchProps = 
  (dispatch, ownProps) => ({
    createPrivateRoom: (user: User, actualUser: User) => dispatch(createNewRoom(`private-${user.nickname}`, false, true))
  });

export default connect<AppState, OnlineUsersItemDispatchProps, any, any>(null, mapDispatchToProps)(OnlineUsersItem);