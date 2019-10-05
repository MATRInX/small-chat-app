import { User } from '../../redux/store/types';

const isNicknameFree: (joinedUsers: User[], roomName: string, nickname: string) => boolean =
  (joinedUsers, roomName, nickname) => {
    for(let i=0; i<joinedUsers.length; i++) {
      if ((joinedUsers[i].roomName === roomName) && (joinedUsers[i].nickname === nickname)) {
        return false;
      }
    }
    return true;
  }

export default isNicknameFree;