import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatWindow from '../ChatWindow/ChatWindow';
import * as Props from './types';
import { AppState } from '../../redux/store/configureStore';
import Socket from '../../socket/index';
import { User } from '../../redux/store/types';

export class ChatApp extends Component<Props.ChatAppProps> {
  constructor(props: Props.ChatAppProps) {
    super(props);
  }

  componentDidMount() {
    Socket.onPrivInvitation(this.onPrivInvitation);
  }

  onPrivInvitation = (actualUser: User, newUser: User) => {
    console.log(`User ${actualUser.nickname} have ask me to join priv room - ${newUser.nickname}`);
  }

  render(){
    const { rooms } = this.props;
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
}

const mapStateToProps: (store: AppState, ownProps: Props.ChatAppProps) => Props.ChatAppStateProps = 
  (state, ownProps) => ({
    rooms: state.rooms
  });

export default connect<Props.ChatAppStateProps, any, any, any>(mapStateToProps)(ChatApp);