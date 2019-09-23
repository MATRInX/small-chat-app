import React, { useState } from 'react';
import * as Props from './types';
import { socket as clientSocket } from '../../index';
import Socket  from '../../socket/index';
import { User } from '../../redux/store/types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { addUserToRoom } from '../../redux/actions/socketIO/user';

export const RoomsListItem = (props: Props.RoomsListItemProps) => {
  const [nickname, setNickname] = useState('');

  const onChange = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;
    // const nickname: string = target.value;
    setNickname(target.value);
  }

  const onSubmit = (event: React.FormEvent<EventTarget>): void => {
    event.preventDefault();
    if (nickname !== '') {
      const newUser: User = {
        roomName: props.roomName,
        socketId: clientSocket.id,
        nickname: nickname,
        isTyping: false
      };
      Socket.to.joinRoom(newUser);
      props.addUserToRoom(newUser);
      Socket.from.onNewUserInRoom(props.addUserToRoom);
      setNickname('');
    }
  }

  return (
    <div className="single-room">
      <h3 className="single-room__name"><a>{props.roomName}</a></h3>
      <form onSubmit={onSubmit}>
        <input
          className="text-input"
          type="text"
          onChange={onChange}
          value={nickname}
          placeholder="Enter your nickname..."
        />
        <button className="btn">Join chat room</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<SocketIOActionTypes>, ownProps: Props.RoomsListItemProps) => ({
  addUserToRoom: (newUser: User) =>
    dispatch(addUserToRoom(newUser.roomName, newUser.socketId, newUser.nickname))
});

export default connect<any, Props.RoomsListitemDispatchProps, any, any>(null, mapDispatchToProps)(RoomsListItem);