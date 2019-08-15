import React from 'react';
import * as Props from './types';
import RoomsListItem from '../RoomsListItem/RoomsListitem';

const RoomsList = (props: Props.RoomsListProps) => {

  return (
    <h4>
      {
        props.rooms.map((singleRoom, index) => {
          //return <p>{singleRoom.roomName}</p>
          return <RoomsListItem key={index} roomName={singleRoom.roomName}/>
        })
      }
    </h4>
  )
}

export default RoomsList;