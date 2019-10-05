import React, { Component } from 'react';
import getOnlineUsers from '../../redux/selectors/getUsersInRoom';
import { OnlineUsersProps, OnlineUsersStoreProps } from './types';
import { connect } from 'react-redux';
import { AppState } from '../../redux/store/configureStore';
import { User } from '../../redux/store/types';
import OnlineUsersItem from '../OnlineUsersItem/OnlineUsersItem';

export const OnlineUsers = (props: OnlineUsersProps) => {
  // const onClickHandle = (user: User) => {
  //   //console.log('priv invitation have been send,,,');
  // }
  return (
    <div className="chat-window__online-users">
      <span>Online users:</span>
      <ul>
        {
          props.users.length === 0 ? (
            <span>No online users</span>
          ) : (
            props.users.map((user, index) => (
              <OnlineUsersItem key={index} user={user}/>
              // <li key={index}>{user.nickname}<button>Priv</button></li>
            ))
          )
        }
      </ul>
    </div>
    )
}

const mapStateToProps: (store: AppState, ownProps: OnlineUsersProps) => OnlineUsersStoreProps =
  (store, ownProps) => ({
    users: getOnlineUsers(store.joinedUsers, ownProps.roomName)
  });

export default connect<OnlineUsersStoreProps, any, any, any>(mapStateToProps)(OnlineUsers);