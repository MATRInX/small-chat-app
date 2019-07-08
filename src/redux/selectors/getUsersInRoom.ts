import { User } from '../store/types';

const getUsersInRoom = (users: User[], roomName: string) => {
  return users.filter(singleUser => 
    singleUser.roomName === roomName ? true : false
  ).sort((a, b) => {
    if (a.nickname < b.nickname) return -1;
    if (a.nickname > b.nickname) return 1;
    return 0;
  });
};

export default getUsersInRoom;