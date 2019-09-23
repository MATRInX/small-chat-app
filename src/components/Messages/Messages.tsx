import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { MessagesStoreProps, MessagesState, MessagesDispatchProps, MessagesProps } from './types';
import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { AppState } from '../../redux/store/configureStore';
import Socket from '../../socket/index';
import { addNewMessage } from '../../redux/actions/socketIO/room';
import getRoomMessages from '../../redux/selectors/getRoomMessages';

export class Messages extends React.Component<MessagesProps, MessagesState> {
  constructor(props: MessagesProps) {
    super(props);
    this.state = {
      messages: []
    };
  }

  __Unounted = false;

  componentDidMount() {
    Socket.from.onRoomMessage(this.addMessage);
  }

  addMessage = (roomName: string, nickname:string, message: string) => {
    if (roomName === this.props.roomName) {
      if (!this.__Unounted) {
        this.props.addNewMessage(roomName, nickname, message);
        this.setState({ messages: [...this.state.messages, nickname+' '+message] });
      }
    }
  }

  componentWillUnmount() {
    this.__Unounted = true;
  }

  render() {
    return (
      <ul id="messages" className="chat-window__messages">
      {
        this.props.roomMessages.length > 0 ? (
          this.props.roomMessages.map((message, index) => (
            <li key={index}>{message.nickname} - {message.message}</li>
          )
        )
        ) : (
        <span>No messages...</span>
        )
      }
      </ul>
    )
  }
}

const mapStateToProps: (store: AppState, ownProps: MessagesProps) => MessagesStoreProps =
(store, ownProps) => ({
  roomMessages: getRoomMessages(store.rooms, ownProps.roomName)
});

const mapDispatchToProps = (dispatch: Dispatch<SocketIOActionTypes>, ownProps: MessagesDispatchProps) => ({
  addNewMessage: (roomName: string, nickname: string, message: string) =>
    dispatch(addNewMessage(roomName, nickname, message))
});

export default connect<MessagesStoreProps, MessagesDispatchProps, any, any>
  (mapStateToProps, mapDispatchToProps)(Messages);