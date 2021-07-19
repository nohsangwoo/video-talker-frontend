import React from 'react';
import LocalVideoView from '../LocalVideoView/LocalVideoView';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';
import CallRejectedDialog from '../CallRejectedDialog/CallRejectedDialog';
import IncomingCallDialog from '../IncomingCallDialog/IncomingCallDialog';
import CallingDialog from '../CallingDialog/CallingDialog';
import {
  callStates,
  setCallRejected,
  setMessage,
} from '../../../store/actions/callActions';
import { useSelector, useDispatch } from 'react-redux';
import ConversationButtons from '../ConversationButtons/ConversationButtons';
import Messenger from '../Messenger/Messenger';
const DirectCall = props => {
  const dispatch = useDispatch();

  const {
    localStream,
    remoteStream,
    callState,
    callerUsername,
    callRejected,
    callingDialogVisible,
    message,
  } = useSelector(state => state.call);

  const hideCallRejectedDialog = callRejectedDetails => {
    dispatch(setCallRejected(callRejectedDetails));
  };

  const setDirectCallMessage = (received, content) => {
    dispatch(setMessage(received, content));
  };

  const conversationProps = {
    localStream,
    remoteStream,
    callState,
    callerUsername,
    callRejected,
    callingDialogVisible,
  };

  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
        <RemoteVideoView remoteStream={remoteStream} />
      )}
      {callRejected.rejected && (
        <CallRejectedDialog
          reason={callRejected.reason}
          hideCallRejectedDialog={hideCallRejectedDialog}
        />
      )}
      {callState === callStates.CALL_REQUESTED && (
        <IncomingCallDialog callerUsername={callerUsername} />
      )}
      {callingDialogVisible && <CallingDialog />}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
        <ConversationButtons />
      )}

      {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
        <Messenger
          message={message}
          setDirectCallMessage={setDirectCallMessage}
        />
      )}
    </>
  );
};

export default DirectCall;
