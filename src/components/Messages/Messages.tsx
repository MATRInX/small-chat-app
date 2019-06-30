import React from 'react';
import { socket } from '../../index';
import { MessagesStandardProps, MessagesState } from './types';
import { SOCKET_EVENTS } from '../../utils/consts';

export default class Messages extends React.Component<MessagesStandardProps, MessagesState> {
  constructor(props: MessagesStandardProps) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    socket.on(SOCKET_EVENTS.roomMessage, (nickname: string, message: string) => {
      this.addMessage(nickname, message);
    })
  }

  addMessage(nickname:string, message: string) {
    const newMessages = this.state.messages;
    newMessages.push(nickname+' '+message);
    this.setState({ messages: newMessages});
  }

  render() {
    return (
      <ul id="messages">
      {
        this.state.messages.length > 0 ? (
          this.state.messages.map((message, index) => (
            <li key={index}>{message}</li>
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