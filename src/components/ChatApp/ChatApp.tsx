import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatWindow from '../ChatWindow/ChatWindow';
import { ChatAppProps, ChatAppStateProps } from './types';
import { AppState } from '../../redux/store/configureStore';

export const ChatApp = (props: ChatAppProps) => {
  const { rooms } = props;
  return <div>
    {
      rooms.length > 0 ? (
        rooms.map((singleRoom, index) => {
          return <ChatWindow key={index} roomName={singleRoom.roomName} />
        })
      ) : (
        <div>There is no rooms...</div>
      )
    }
  </div>
  
}

const mapStateToProps: (store: AppState, ownProps: ChatAppProps) => ChatAppStateProps = 
  (state, ownProps) => ({
    rooms: state.rooms
  });

export default connect<ChatAppStateProps, any, any, any>(mapStateToProps)(ChatApp);