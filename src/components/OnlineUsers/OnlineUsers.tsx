import React, { Component } from 'react';
import getOnlineUsers from '../../redux/selectors/getUsersInRoom';
import { OnlineUsersProps, OnlineUsersStoreProps } from './types';
import { connect } from 'react-redux';
import { AppState } from '../../redux/store/configureStore';

export const OnlineUsers = (props: OnlineUsersProps) => (
  <div><span>Online users:</span>
    <ul>
      {
        props.users.length === 0 ? (
          <span>No online users</span>
        ) : (
          props.users.map((user, index) => (
            <li key={index}>{user.nickname}</li>
          ))
        )
      }
    </ul>
  </div>
)

const mapStateToProps: (store: AppState, ownProps: OnlineUsersProps) => OnlineUsersStoreProps = 
  (store, ownProps) => ({
    users: getOnlineUsers(store.joinedUsers, ownProps.roomName)
  });

export default connect<OnlineUsersStoreProps, any, any, any>(mapStateToProps)(OnlineUsers);