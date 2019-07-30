import { User } from '../store/types';

const getAllTypingsUsers: (users: User[], actualUserNickname: string, actualRoomName: string) => User[] = 
  (users, actualUserNickname, actualRoomName) => 
    users.filter(user => 
      user.isTyping && 
      user.nickname !== actualUserNickname && 
      user.roomName === actualRoomName);

export default getAllTypingsUsers;