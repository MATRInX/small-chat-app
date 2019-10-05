import React, { useState, useEffect } from 'react';
import * as Props from './types';
import { socket as clientSocket } from '../../index';
import Socket  from '../../socket/index';
import { User } from '../../redux/store/types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { addUserToRoom } from '../../redux/actions/socketIO/user';
import { AppState } from '../../redux/store/configureStore';
import isNicknameFree from '../../redux/selectors/isNicknameFree';
import AnimatedDiv from '../AnimatedDiv/AnimatedDiv';

export const RoomsListItem = (props: Props.RoomsListItemProps) => {
  const [nickname, setNickname] = useState('');
  const [validNickname, setValidNickname] = useState(true);

  // useEffect(() => {
  //   //Socket.from.onNewUserInRoom(props.addUserToRoom);
  // })

  const onChange = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;
    // const nickname: string = target.value;
    setNickname(target.value);
    setValidNickname(props.isNicknameFree(target.value))
  }

  const onSubmit = (event: React.FormEvent<EventTarget>): void => {
    event.preventDefault();
    if (nickname !== '') {
      const nicknameCheck = props.isNicknameFree(nickname);

      if (nicknameCheck) {
        const newUser: User = {
          roomName: props.roomName,
          socketId: clientSocket.id,
          nickname: nickname,
          isTyping: false
        };
        Socket.to.joinRoom(newUser);
        props.addUserToRoom(newUser);

        setNickname('');
      }
      setValidNickname(nicknameCheck);
    }
  }

  return (
    <div className="single-room">
      <h3 className="single-room__name">
        <a>{props.roomName}</a>
      </h3>
      <form onSubmit={onSubmit}>
        <input
          className="text-input"
          type="text"
          onChange={onChange}
          value={nickname}
          placeholder="Enter your nickname..."
          />
          {/* {nickname !== '' &&
           !validNickname &&
           <span className="single-room__error">This nickname is already in use in this room!</span>} */}
          <AnimatedDiv
            className="single-room__error"
            startAnimation="fadeIn"
            endAnimation="fadeOut"
            show={nickname !== '' && !validNickname}
          >
            This nickname is already in use in this room!
          </AnimatedDiv>
        <button className="btn">Join chat room</button>
      </form>
    </div>
  )
}

const mapStateToProps = (store: AppState, ownProps: Props.RoomsListItemProps) => ({
  isNicknameFree: (nickname:string) => isNicknameFree(store.joinedUsers, ownProps.roomName, nickname)
});

const mapDispatchToProps = (dispatch: Dispatch<SocketIOActionTypes>, ownProps: Props.RoomsListItemProps) => ({
  addUserToRoom: (newUser: User) => dispatch(addUserToRoom(newUser.roomName, newUser.socketId, newUser.nickname))
});

export default connect<Props.RoomsListItemStoreProps, Props.RoomsListitemDispatchProps, any, any>
  (mapStateToProps, mapDispatchToProps)(RoomsListItem);