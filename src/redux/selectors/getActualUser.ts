import { User } from '../store/types';

const getActualUser = (users: User[], socketId: string) => {
  let actUser: User = {
    socketId: '', nickname: '', roomName: '', isTyping: false
  };
  users.map(user => {
    if (user.socketId === socketId) {
      actUser = user;
    }
  });
  return actUser;
};

export default getActualUser;