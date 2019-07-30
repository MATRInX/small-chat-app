import React, { FormEvent } from 'react';
import { socket } from '../../index';
import { InputBarStoreProps, InputBarState, InputBarProps, InputBarDispatchProps } from './types';
import { SOCKET_EVENTS } from '../../utils/consts';
import Socket from '../../socket/index';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../redux/store/configureStore';
import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { setUserTyping } from '../../redux/actions/socketIO/user';
import getActualUser from '../../redux/selectors/getActualUser';
import getAllTypingsUsers from '../../redux/selectors/getAllTypingsUsers';

export class InputBar extends React.Component<InputBarProps, InputBarState> {
  constructor(props: InputBarProps) {
    super(props);
    this.state = {
      message: '',      
      typings: false,
      typingsUsername: '',
      timeout: undefined
    };
  }

  componentDidMount() {
    Socket.onUserTypings(this.setTypingsState);
  }

  onSubmit = (event: FormEvent<EventTarget>): void => {
    event.preventDefault(); 
    // socket.emit(SOCKET_EVENTS.chatMessage, this.state.message);
    Socket.sendMessage(this.props.roomName, this.props.nickname, this.state.message);
    this.setState({ message: '' });
  }

  onChange = (event: FormEvent<EventTarget>): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const message: string = target.value;
    this.setState({ message });
  }

  onKeydown = (event: FormEvent<EventTarget>): void => {
    const {roomName, nickname, setUserTyping, actualUser} = this.props;
    clearTimeout(this.state.timeout);
    
    if (!actualUser.isTyping) {
      Socket.emitUserTypings(roomName, nickname, true);
      setUserTyping(roomName, nickname, true);
    }
    const timeout = setTimeout(() => {
      Socket.emitUserTypings(roomName, nickname, false);
      setUserTyping(roomName, nickname, false);
    }, 5000);    
    this.setState({ timeout })
  }

  setTypingsState = (roomName: string, userNickname: string, isTypings: boolean) => {
    if (roomName === this.props.roomName) {
      this.setState({ typings: isTypings, typingsUsername: userNickname });
      console.log('setUserTypings: ', this.props.roomName, userNickname, isTypings);
      this.props.setUserTyping(this.props.roomName, userNickname, isTypings);
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
      {this.props.typingsUsers.length > 0 ? 
        <div>User {`${this.props.typingsUsers.map(u => u.nickname).join(',')}`} {this.props.typingsUsers.length===1 ? 'is' : 'are'} typings...</div> : 
        <div></div>}
        <span>{this.props.nickname}</span>
        <input 
          id="message" 
          type="text" 
          autoComplete="off" 
          value={this.state.message} 
          onChange={this.onChange} 
          onKeyDown={this.onKeydown}
        />
        <button>Send</button>
      </form>
    )
  }
}

const mapStateToProps: (store: AppState, ownProps: InputBarProps) => InputBarStoreProps = 
  (store, ownProps) => ({
    actualUser: getActualUser(store.joinedUsers, socket.id),
    typingsUsers: getAllTypingsUsers(store.joinedUsers, ownProps.nickname, ownProps.roomName)
  });

const mapDispatchToProps = (dispatch: Dispatch<SocketIOActionTypes>, ownProps: InputBarDispatchProps) => ({
  setUserTyping: (roomName: string, nickname: string, isTyping: boolean) => {
    dispatch(setUserTyping(roomName, nickname, isTyping))
  }
})

export default connect<InputBarStoreProps, InputBarDispatchProps, any, any>(mapStateToProps, mapDispatchToProps)(InputBar);