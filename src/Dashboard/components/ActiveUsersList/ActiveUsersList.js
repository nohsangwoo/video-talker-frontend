import React from 'react';
import './ActiveUsersList.css';
import ActiveUsersListItem from './ActiveUsersListItem';
import { useSelector } from 'react-redux';

const ActiveUsersList = () => {
  const {
    dashboard: { activeUsers },
  } = useSelector(state => state);
  console.log(activeUsers);
  return (
    <div className="active_user_list_container">
      {activeUsers.map((activeUser, index) => {
        console.log('activeUser map:', activeUser);
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
