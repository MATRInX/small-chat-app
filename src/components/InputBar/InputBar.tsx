import React, { FormEvent, useState, useEffect, SFC } from 'react';
import { socket } from '../../index';
import { InputBarStoreProps, InputBarState, InputBarProps, InputBarDispatchProps } from './types';
import { SOCKET_EVENTS } from '../../utils/consts';
import Socket from '../../socket/index';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../redux/store/configureStore';
import { SocketIOActionTypes } from '../../redux/actions/socketIO/types';
import { setUserTyping } from '../../redux/actions/socketIO/user';
import { addNewMessage } from '../../redux/actions/socketIO/room';
import getActualUser from '../../redux/selectors/getActualUser';
import getAllTypingsUsers from '../../redux/selectors/getAllTypingsUsers';
import { TransitionGroup } from 'react-transition-group';

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

  __Unmounted = false;

  componentDidMount() {
    Socket.from.onUserTypings(this.setTypingsState);
  }

  componentWillUnmount() {
    this.__Unmounted = true;
  }

  onSubmit = (event: FormEvent<EventTarget>): void => {
    const { roomName, nickname, setUserTyping } = this.props;
    const { message, timeout } = this.state;
    event.preventDefault();
    Socket.to.sendMessage(roomName, nickname, message);
    this.props.addNewMessage(roomName, nickname, message);
    this.setState({ message: '' });

    clearTimeout(timeout);
    Socket.to.emitUserTypings(roomName, nickname, false);
    setUserTyping(roomName, nickname, false);
    this.setState({ timeout });
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
      Socket.to.emitUserTypings(roomName, nickname, true);
      setUserTyping(roomName, nickname, true);
    }
    const timeout = setTimeout(() => {
      Socket.to.emitUserTypings(roomName, nickname, false);
      setUserTyping(roomName, nickname, false);
    }, 5000);
    this.setState({ timeout })
  }

  setTypingsState = (roomName: string, userNickname: string, isTypings: boolean) => {
    if (roomName === this.props.roomName) {
      if (!this.__Unmounted) {
        this.setState({ typings: isTypings, typingsUsername: userNickname });
      }
      this.props.setUserTyping(this.props.roomName, userNickname, isTypings);
    }
  }

  render() {
    const { typingsUsers } = this.props;
    const users = typingsUsers.map(u => u.nickname).join(',');
    const areTypings = typingsUsers.length === 1 ? 'is' : 'are';

    return (
      <form className="chat-window__input-bar" onSubmit={this.onSubmit}>
      {/* {this.props.typingsUsers.length > 0 ?
        <div className="chat-window__typings">User {`${this.props.typingsUsers.map(u => u.nickname).join(',')}`} {this.props.typingsUsers.length===1 ? 'is' : 'are'} typings...</div> :
        <div></div>} */}

        {/* <div className={"chat-window__typings" + (this.props.typingsUsers.length > 0 ? ' widzialny' : ' niewidzialny')}>User is typings...</div> : */}

        {/* <div className="chat-window__typings">
          {this.props.typingsUsers.length > 0 ? `User ${this.props.typingsUsers.map(u => u.nickname).join(',')}`: ""}
        </div> */}
        {/* <div className="chat-window__typings">User is typing</div> */}
        <Fade className="chat-window__typings" show={typingsUsers.length > 0}>
          {/* <div>{`Users ${users} ${areTypings} typing...`}</div> */}
          {`Users ${users} ${areTypings} typing...`}
        </Fade>
        <input
          id="message"
          type="text"
          className="text-input text-input--message"
          autoComplete="off"
          name="message"
          value={this.state.message}
          onChange={this.onChange}
          onKeyDown={this.onKeydown}
          placeholder={`${this.props.nickname} type here your message...`}
        />
        <button className="btn btn--send-new-message">Send</button>
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
  setUserTyping: (roomName: string, nickname: string, isTyping: boolean): void => {
    dispatch(setUserTyping(roomName, nickname, isTyping))
  },
  addNewMessage: (roomName: string, nickname: string, message: string): void => {
    dispatch(addNewMessage(roomName, nickname, message))
  }
})

export default connect<InputBarStoreProps, InputBarDispatchProps, any, any>(mapStateToProps, mapDispatchToProps)(InputBar);

interface FadeProps {
  show: Boolean,
  className: string
}

const Fade: SFC<FadeProps> = ({show, className, children}) => {
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    shouldRender && (
      <div
        className={className}
        // style={{ animation: `${show ? "movingFromTop" : "movingToTop"} 1s ease-in-out 0s 1 normal both` }}
        style={{ animationName: `${show ? "movingFromTop" : "movingToTop"}` }}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  );
};