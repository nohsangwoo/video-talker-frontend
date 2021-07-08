import React from 'react';
import userAvatar from '../../../assets/userAvatar.png';

const ActiveUsersListItem = ({ activeUser }) => {
  const handleListItemPressed = () => {
    // call to other user
  };
  return (
    <div className="active_user_list_item" onClick={handleListItemPressed}>
      <div className="active_user_list_image_container">
        <img className="active_user_list_image" src={userAvatar} alt="avatar" />
      </div>
      <span className="active_user_list_text">{activeUser.username}</span>
    </div>
  );
};

export default ActiveUsersListItem;
