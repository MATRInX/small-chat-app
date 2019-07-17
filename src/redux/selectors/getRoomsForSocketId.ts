import { User } from '../store/types';

const getRoomsForSocketId: (joinedUsers: User[], socketId: string) => string[] = 
  (joinedUsers, socketId) => {
    const roomsForSocketId: string[] = [];
    joinedUsers.map(user => {
      if (user.socketId = socketId) roomsForSocketId.push(user.roomName);
    });
    return roomsForSocketId;
  };

export default getRoomsForSocketId;