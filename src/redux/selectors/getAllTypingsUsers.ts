import { User } from '../store/types';

const getAllTypingsUsers: (users: User[], actualUserNickname: string) => User[] = 
  (users, actualUserNickname) => 
    users.filter(user => user.isTyping && user.nickname !== actualUserNickname);

export default getAllTypingsUsers;