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

const onGetYourUserToSocket = (myUserData: User): void => {
  console.log('onGetYourUserToSocket: ', myUserData);
  socket.on(SOCKET_EVENTS.getYourUserData, (destinationSocketId: string) => {
    socket.emit(SOCKET_EVENTS.sendMyNickname, myUserData, destinationSocketId);
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
  socket.on(SOCKET_EVENTS.roomMessage, (nickname: string, message: string) => {
    fn(nickname, message);
  })
}

export default {
  connectToSocket,
  disconnectFromSocket,
  sendMessage,
  joinRoom,
  onGetYourUserToSocket,
  onNewUserInRoom,
  onRoomMessage
};