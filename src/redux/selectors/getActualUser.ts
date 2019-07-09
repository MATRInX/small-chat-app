import { User } from '../store/types';

const getActualUser = (users: User[], nickname: string, roomName: string) => {
  let actUser: User = {
    socketId: '', nickname: '', roomName: '', isTyping: false
  };
  users.map(user => {
    if ((user.nickname === nickname) && (user.roomName === roomName)) {
      actUser = user;
    }
  });
  return actUser;
};

export default getActualUser;