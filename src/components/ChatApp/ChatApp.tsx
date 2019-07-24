import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatWindow from '../ChatWindow/ChatWindow';
import * as Props from './types';
import { AppState } from '../../redux/store/configureStore';
import Socket from '../../socket/index';
import { User } from '../../redux/store/types';
import PrivRequestModal from '../PrivRequestModal/PrivRequestModal';
import { PrivRequestModalInfo } from '../PrivRequestModal/types';

export class ChatApp extends Component<Props.ChatAppProps, Props.ChatAppState> {
  constructor(props: Props.ChatAppProps) {
    super(props);
    this.state = {
      invitations: []
    }
  }

  componentDidMount() {
    Socket.onPrivInvitation(this.onPrivInvitation);
  }

  onPrivInvitation = (actualUser: User, newUser: User, roomName: string) => {
    console.log(`User ${actualUser.nickname} have ask me to join priv room - ${newUser.nickname} room: ${roomName}`);    
    this.setState(state => {
      const newInvitation: PrivRequestModalInfo = {
        isModalOpen: true,
        invitingUser: actualUser.nickname,
        roomName
      };
      const invitations = [...state.invitations, newInvitation];
      return { invitations };
    });
  }

  closeModal = (indexToClose: number) => {
    this.setState(state => {
      const invitations = state.invitations.map((item, index) => {
        if (index === indexToClose ) {
          item.isModalOpen = false;
          return item;
        } else {
          return item;
        }
      });
      return { invitations };
    });
  }

  render(){
    const { rooms } = this.props;
    const { invitations } = this.state;
    return <div>      
      {
        (invitations.length > 0 && invitations.map((item, index) => (
          <PrivRequestModal 
            key={index}
            isModalOpen={item.isModalOpen} 
            onCloseModal={() => this.closeModal(index)}
            invitingUser={item.invitingUser}
            roomName={item.roomName}
          />
          ))
        )
      }      
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