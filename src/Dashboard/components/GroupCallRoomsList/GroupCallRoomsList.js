import React from 'react';
import GroupCallRoomsListItem from './GroupCallRoomsListItem';
import { useSelector } from 'react-redux';

import './GroupCallRoomsList.css';

const GroupCallRoomsList = () => {
  const {
    dashboard: { groupCallRooms },
  } = useSelector(state => state);
  console.log('groupCallRooms in groupCallRoomslist: ', groupCallRooms);
  return (
    <>
      {groupCallRooms.map(room => (
        <GroupCallRoomsListItem key={room.roomId} room={room} />
      ))}
    </>
  );
};

export default GroupCallRoomsList;
