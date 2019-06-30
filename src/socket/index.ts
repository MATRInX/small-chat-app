import io from 'socket.io-client';
import { socket } from '../index';
import { SOCKET_EVENTS } from '../utils/consts';

const connectToSocket = (nickname: string) => {
  socket.emit(SOCKET_EVENTS.connect, nickname);
};

const disconnectFromSocket = () => {
  socket.emit(SOCKET_EVENTS.disconnect);
};

const sendMessage = (nickname: string, message:string): void => {
  socket.emit(SOCKET_EVENTS.chatMessage, nickname, message);
};

export default {
  connectToSocket,
  disconnectFromSocket,
  sendMessage
};