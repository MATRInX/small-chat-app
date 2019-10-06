import React, { Component, useState, useEffect } from 'react';
import getOnlineUsers from '../../redux/selectors/getUsersInRoom';
import { OnlineUsersProps, OnlineUsersStoreProps } from './types';
import { connect } from 'react-redux';
import { AppState } from '../../redux/store/configureStore';
import OnlineUsersItem from '../OnlineUsersItem/OnlineUsersItem';
import useWindowDimension from '../../utils/Hooks/useWindowDimension/useWindowDimension';

export const OnlineUsers = (props: OnlineUsersProps) => {
  const { width } = useWindowDimension();
  const [isMobile, setIsMobile] = useState(width < 450);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setIsMobile(width < 450);
  }, [width]);

  const onClickHandle = () => {
    if (isMobile) {
      setShowMenu(!showMenu);
    }
  };

  return (
    <div className={`chat-window__online-users ${isMobile ? (showMenu ? 'show' : 'hide') : ''}`} >
      <span onClick={onClickHandle}>Online users:</span>
      <ul className={`${isMobile ? (showMenu ? 'show' : 'hide') : ''}`}>
        {
          props.users.length === 0 ? (
            <span>No online users</span>
          ) : (
            props.users.map((user, index) => (
              <OnlineUsersItem key={index} user={user}/>
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