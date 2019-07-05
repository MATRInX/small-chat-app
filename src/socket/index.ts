import io from 'socket.io-client';
import { socket } from '../index';
import { SOCKET_EVENTS } from '../utils/consts';

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

const joinRoom = (roomName: string): void => {
  socket.emit(SOCKET_EVENTS.joinRoom, roomName);
}

export default {
  connectToSocket,
  disconnectFromSocket,
  sendMessage,
  joinRoom
};