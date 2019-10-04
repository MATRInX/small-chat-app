import { Room } from '../../redux/store/types';

const isRoomPrivate = (rooms: Room[], roomName: string): boolean => {
  for (let i=0; i<rooms.length; i++) {
    if (rooms[i].roomName === roomName && rooms[i].isPrivate) {
      return true;
    }
  }
  return false;
};

export default isRoomPrivate;