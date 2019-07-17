import { User } from '../../redux/store/types';

const isUserLoggedInRoom: (joinedUsers: User[], roomName: string, socketId: string) => boolean = 
  (joinedUsers, roomName, socketId) => {
    for(let i=0; i<joinedUsers.length; i++) {
      if ((joinedUsers[i].roomName === roomName) && (joinedUsers[i].socketId === socketId)) {
        return true;
      }
    }
    return false;
  }

export default isUserLoggedInRoom;