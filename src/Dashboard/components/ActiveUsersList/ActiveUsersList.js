import React from 'react';
import './ActiveUsersList.css';
import ActiveUsersListItem from './ActiveUsersListItem';

const activeUsers = [
  {
    socketId: 321,
    username: 'Noh',
  },
  {
    socketId: 333,
    username: 'Kim',
  },
  {
    socketId: 432,
    username: 'Noh',
  },
  {
    socketId: 345,
    username: 'Ahn',
  },
];
const ActiveUsersList = () => {
  return (
    <div className="active_user_list_container">
      {activeUsers.map((activeUser, index) => {
        return (
          <ActiveUsersListItem
            key={activeUser.socketId}
            activeUser={activeUser}
          />
        );
      })}
    </div>
  );
};

export default ActiveUsersList;
