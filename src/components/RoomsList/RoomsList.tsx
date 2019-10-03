import React from 'react';
import * as Props from './types';
import RoomsListItem from '../RoomsListItem/RoomsListitem';
import { socket } from '../../index';

const RoomsList = (props: Props.RoomsListProps) => {

  return (
    <h4>
      {
        props.rooms.filter((singleRoom, index) => {
          for(let i=0; i<props.users.length; i++){
            if (props.users[i].roomName === singleRoom.roomName) {
              if (props.users[i].socketId === socket.id) {
                return false;
              }
            }
          }
          return true;
        }).map((singleRoom, index) => {
          //return <p>{singleRoom.roomName}</p>
          return <RoomsListItem key={index} roomName={singleRoom.roomName}/>
        })
      }
    </h4>
  )
}

export default RoomsList;