import React from 'react';
import GroupCallButton from '../GroupCallButton/GroupCallButton';
import {
  callStates,
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
} from '../../../store/actions/callActions';
import * as webRTCGroupCallHandler from '../../../utils/webRTC/webRTCGroupCallHandler';
import GroupCallRoom from '../GroupCallRoom/GroupCallRoom';
import { useSelector, useDispatch } from 'react-redux';
const GroupCall = props => {
  const dispatch = useDispatch();
  const {
    call: { callState, localStream, groupCallActive, groupCallStreams },
  } = useSelector(state => state);

  const createRoom = () => {
    webRTCGroupCallHandler.createNewGroupCall();
  };

  const leaveRoom = () => {
    webRTCGroupCallHandler.leaveGroupCall();
  };

  const setCameraEnabled = enabled => dispatch(setLocalCameraEnabled(enabled));
  const setMicrophoneEnabled = enabled =>
    dispatch(setLocalMicrophoneEnabled(enabled));

  return (
    <>
      {!groupCallActive &&
        localStream &&
        callState !== callStates.CALL_IN_PROGRESS && (
          <GroupCallButton onClickHandler={createRoom} label="Create room" />
        )}
      {groupCallActive && (
        <GroupCallRoom
          groupCallStreams={groupCallStreams}
          setCameraEnabled={setCameraEnabled}
          setMicrophoneEnabled={setMicrophoneEnabled}
        />
      )}
      {groupCallActive && (
        <GroupCallButton onClickHandler={leaveRoom} label="Leave room" />
      )}
    </>
  );
};

export default GroupCall;
