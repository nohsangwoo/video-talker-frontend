import React from 'react';
import userAvatar from '../../../assets/userAvatar.png';
import { callToOtherUser } from '../../../utils/webRTC/webRTCHandler';

const ActiveUsersListItem = ({ activeUser }) => {
  // 유저 리스트중 하나를 클릭하면 해당 인원에게 전화를 건다
  const handleListItemPressed = () => {
    //   실제 전화 거는 함수
    // 이때 같이 보내는 정보는 전화를 받는 대상의 유저정보를 같이 보냄
    callToOtherUser(activeUser);
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
