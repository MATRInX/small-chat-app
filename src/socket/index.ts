import { socket } from '../index';
import { SOCKET_EVENTS } from '../utils/consts';
import { User } from '../redux/store/types';
// TO SOCKET
const connectToSocket = (nickname: string) => {
  socket.emit(SOCKET_EVENTS.connect, nickname);
};
const disconnectFromRoom = (roomName: string, socketId: string) => {
  socket.emit(SOCKET_EVENTS.disconnectUserFromRoom, roomName, socketId);
};
const sendMessage = (roomName: string, nickname: string, message:string): void => {
  socket.emit(SOCKET_EVENTS.roomMessage, roomName, nickname, message);
};
const joinRoom = (newUser: User): void => {
  socket.emit(SOCKET_EVENTS.joinRoom, newUser);
};
const emitUserTypings = (roomName: string, typingsUser: string, isTyping: boolean) => {
  socket.emit(SOCKET_EVENTS.userIsTypings, roomName, typingsUser, isTyping);
};
const emitPrivInvitation = (invitingUser: User, newUser: User, roomName: string) => {
  socket.emit(SOCKET_EVENTS.sendPrivInvitation, invitingUser, newUser, roomName);
};
const emitPrivRejection = (invitingUser: string,
  myNickname: string,
  invitingUserSocketId: string,
  roomName: string) => {
  socket.emit(SOCKET_EVENTS.getPrivRejection, invitingUser, myNickname, invitingUserSocketId, roomName);
}
// FROM SOCKET
const disconnectUser = (fn: Function):void => {
  socket.on(SOCKET_EVENTS.disconnect, (socketId: string) => {
    fn(socketId);
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
const offRoomMessage = (): void => {
  socket.off(SOCKET_EVENTS.roomMessage);
}
const onUserTypings = (fn: Function) => {
  socket.on(SOCKET_EVENTS.userIsTypings, (roomName: string, typingsUser: string, isTyping: boolean) => {
    fn(roomName, typingsUser, isTyping);
  });
};
const offUserTypings = () => {
  socket.off(SOCKET_EVENTS.userIsTypings);
}
const onPrivInvitation = (fn: Function) => {
  socket.on(SOCKET_EVENTS.sendPrivInvitation, (invitingUser: User, newUser: User, roomName: string) => {
    fn(invitingUser, newUser, roomName);
  });
};
const onPrivRejection = (fn: Function) => {
  socket.on(SOCKET_EVENTS.getPrivRejection, (invitingUser: User,
    rejectingUser: User,
    invitingUserSocketId: string,
    roomName: string) => {
    fn(invitingUser, rejectingUser, invitingUserSocketId, roomName);
  })
}
const onDeleteUserFromRoom = (fn: Function) => {
  socket.on(SOCKET_EVENTS.deleteUserFromRoom, (roomName: string, socketId: string) => {
    fn(roomName, socketId);
  })
};
// FROM AND TO SOCKET
const onGetYourUserToSocket = (myUserData: User, myRoomName: string): void => {
  socket.on(SOCKET_EVENTS.getYourUserData, (destinationSocketId: string, roomName: string) => {
    if (myUserData.nickname !== '' && myUserData.socketId !== undefined && myRoomName === roomName) {
      socket.emit(SOCKET_EVENTS.sendMyNickname, myUserData, destinationSocketId);
    }
  })
};

export default {
  to: {
    connectToSocket,
    disconnectFromRoom,
    sendMessage,
    joinRoom,
    emitUserTypings,
    emitPrivInvitation,
    emitPrivRejection
  },
  from: {
    onNewUserInRoom,
    onRoomMessage,
    offRoomMessage,
    onUserTypings,
    offUserTypings,
    onPrivInvitation,
    onPrivRejection,
    disconnectUser,
    onDeleteUserFromRoom
  },
  fromAndTo: {
    onGetYourUserToSocket
  }
};