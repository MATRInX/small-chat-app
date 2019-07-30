import io from 'socket.io-client';
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
  // socket.emit(SOCKET_EVENTS.chatMessage, nickname, message);
  socket.emit(SOCKET_EVENTS.roomMessage, roomName, nickname, message);
};

const joinRoom = (newUser: User): void => {
  console.log('joinRoom: ', newUser);
  socket.emit(SOCKET_EVENTS.joinRoom, newUser);
};

const onGetYourUserToSocket = (myUserData: User, myRoomName: string): void => {
  console.log('onGetYourUserToSocket: ', myUserData);
  socket.on(SOCKET_EVENTS.getYourUserData, (destinationSocketId: string, roomName: string) => {
    if (myUserData.nickname !== '' && myUserData.socketId !== undefined && myRoomName === roomName) {
      socket.emit(SOCKET_EVENTS.sendMyNickname, myUserData, destinationSocketId);
    }
  })
};

const onNewUserInRoom = (fn: Function): void => {
  console.log('onNewUserInRoom has been fired');
  socket.on(SOCKET_EVENTS.addNewUserToRoom, (newUser: User) => {
    fn(newUser);
  })
};

const onRoomMessage = (fn: Function): void => {
  console.log('onRoomMessage has been fired');
  socket.on(SOCKET_EVENTS.roomMessage, (roomName: string, nickname: string, message: string) => {
    fn(roomName, nickname, message);
  })
};

const emitUserTypings = (roomName: string, userNickname: string, isTyping: boolean) => {
  socket.emit(SOCKET_EVENTS.userIsTypings, roomName, userNickname, isTyping);
};

const onUserTypings = (fn: Function) => {
  console.log('onUserTypings');
  socket.on(SOCKET_EVENTS.userIsTypings, (roomName: string, userNickname: string, isTyping: boolean) => {
    fn(roomName, userNickname, isTyping);
  });
};

const emitPrivInvitation = (actualUser: User, newUser: User, roomName: string) => {
  console.log(`send invitation from ${actualUser.nickname} to ${newUser.nickname} room: ${roomName}`);
  socket.emit(SOCKET_EVENTS.sendPrivInvitation, actualUser, newUser, roomName);
}

const onPrivInvitation = (fn: Function) => {
  console.log(`I get invitation to priv`);
  socket.on(SOCKET_EVENTS.sendPrivInvitation, (actualUser: User, newUser: User, roomName: string) => {
    fn(actualUser, newUser, roomName);
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