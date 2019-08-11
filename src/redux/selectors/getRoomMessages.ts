import { Room, Message } from '../../redux/store/types';

const getRoomMessages = (rooms: Room[], roomName: string): Message[] => {
  let messages: Message[] = [];
  for (let i=0; i<rooms.length; i++) {
    if (rooms[i].roomName === roomName) {
      messages = rooms[i].messages;
      break;
    }
  }
  return messages;
};

export default getRoomMessages;