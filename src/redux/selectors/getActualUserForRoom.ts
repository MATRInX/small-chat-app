import { User } from '../../redux/store/types';

const getActualUserForRoom: (joinedUsers: User[], roomName: string, socketId: string) => User = 
  (joinedUsers, roomName, socketId) => {
    let actualUser: User = {
      socketId: '', nickname: '', roomName: '', isTyping: false
    };
    // console.log('getActualUserForRoom - joinderUsers: ', joinedUsers);
    for( let i = 0; i<joinedUsers.length; i++){
      // console.log('socket comparision: ', joinedUsers[i].socketId, socketId);
      // console.log('roomName comparision: ', joinedUsers[i].roomName, roomName);
      if ((joinedUsers[i].socketId === socketId) && (joinedUsers[i].roomName === roomName)){
        actualUser = joinedUsers[i];
        // console.log(`getActualUserForRoom: room-${roomName} socketId-${socketId}`);
        // console.log(`getActualUserForRoom: actualUser-${actualUser}`);
        break;
      }
    }
    return actualUser;
  }

export default getActualUserForRoom;