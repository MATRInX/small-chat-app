import React from 'react';
import { ChatWindowStandardProps, ChatWindowState } from './types';
import Messages from '../Messages/Messages';
import InputBar from '../InputBar/InputBar';

export default class ChatWindow extends React.Component<ChatWindowStandardProps, ChatWindowState> {
  constructor(props: ChatWindowStandardProps) {
    super(props);
    this.state = {
      nickname: ''
    };
  }

  render() {
    return (
      <div>
        <Messages />
        <InputBar />
      </div>
    )
  }
}