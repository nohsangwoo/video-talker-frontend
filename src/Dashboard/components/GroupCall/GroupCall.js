import React from 'react';
import GroupCallButton from '../GroupCallButton/GroupCallButton';
import { callStates } from '../../../store/actions/callActions';
import * as webRTCGroupCallHandler from '../../../utils/webRTC/webRTCGroupCallHandler';
import GroupCallRoom from '../GroupCallRoom/GroupCallRoom';
import { useSelector } from 'react-redux';
const GroupCall = props => {
  const {
    call: { callState, localStream, groupCallActive, groupCallStreams },
  } = useSelector(state => state);

  const createRoom = () => {
    webRTCGroupCallHandler.createNewGroupCall();
  };

  const leaveRoom = () => {
    webRTCGroupCallHandler.leaveGroupCall();
  };

  return (
    <>
      {!groupCallActive &&
        localStream &&
        callState !== callStates.CALL_IN_PROGRESS && (
          <GroupCallButton onClickHandler={createRoom} label="Create room" />
        )}
      {groupCallActive && <GroupCallRoom groupCallStreams={groupCallStreams} />}
      {groupCallActive && (
        <GroupCallButton onClickHandler={leaveRoom} label="Leave room" />
      )}
    </>
  );
};

export default GroupCall;
