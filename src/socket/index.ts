import { socket } from '../index';
import { SOCKET_EVENTS } from '../utils/consts';
import { User } from '../redux/store/types';

const connectToSocket = (nickname: string) => {
  socket.emit(SOCKET_EVENTS.connect, nickname);
};

const disconnectFromSocket = () => {
  socket.emit(SOCKET_EVENTS.disconnect);
};

const sendMessage = (roomName: string, nickname: string, message:string): void => {
  socket.emit(SOCKET_EVENTS.roomMessage, roomName, nickname, message);
};

const joinRoom = (newUser: User): void => {
  socket.emit(SOCKET_EVENTS.joinRoom, newUser);
};

const onGetYourUserToSocket = (myUserData: User, myRoomName: string): void => {
  socket.on(SOCKET_EVENTS.getYourUserData, (destinationSocketId: string, roomName: string) => {
    if (myUserData.nickname !== '' && myUserData.socketId !== undefined && myRoomName === roomName) {
      socket.emit(SOCKET_EVENTS.sendMyNickname, myUserData, destinationSocketId);
    }
  })
};

const onNewUserInRoom = (fn: Function): void => {
  socket.on(SOCKET_EVENTS.addNewUserToRoom, (newUser: User) => {
    fn(newUser);
  })
};

const onRoomMessage = (fn: Function): void => {
  socket.on(SOCKET_EVENTS.roomMessage, (roomName: string, nickname: string, message: string) => {
    fn(roomName, nickname, message);
  })
};

const emitUserTypings = (roomName: string, typingsUser: string, isTyping: boolean) => {
  socket.emit(SOCKET_EVENTS.userIsTypings, roomName, typingsUser, isTyping);
};

const onUserTypings = (fn: Function) => {
  socket.on(SOCKET_EVENTS.userIsTypings, (roomName: string, typingsUser: string, isTyping: boolean) => {
    fn(roomName, typingsUser, isTyping);
  });
};

const emitPrivInvitation = (invitingUser: User, newUser: User, roomName: string) => {
  socket.emit(SOCKET_EVENTS.sendPrivInvitation, invitingUser, newUser, roomName);
}

const onPrivInvitation = (fn: Function) => {
  socket.on(SOCKET_EVENTS.sendPrivInvitation, (invitingUser: User, newUser: User, roomName: string) => {
    fn(invitingUser, newUser, roomName);
  });
}

export default {
  connectToSocket,
  disconnectFromSocket,
  sendMessage,
  joinRoom,
  onGetYourUserToSocket,
  onNewUserInRoom,
  onRoomMessage,
  emitUserTypings,
  onUserTypings,
  emitPrivInvitation,
  onPrivInvitation
};