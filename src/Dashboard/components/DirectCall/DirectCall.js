import React from 'react';
import LocalVideoView from '../LocalVideoView/LocalVideoView';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';
import CallRejectedDialog from '../CallRejectedDialog/CallRejectedDialog';
import IncomingCallDialog from '../IncomingCallDialog/IncomingCallDialog';
import CallingDialog from '../CallingDialog/CallingDialog';
import {
  callStates,
  setCallRejected,
} from '../../../store/actions/callActions';
import { useSelector, useDispatch } from 'react-redux';
import ConversationButtons from '../ConversationButtons/ConversationButtons';
const DirectCall = props => {
  const dispatch = useDispatch();

  const {
    localStream,
    remoteStream,
    callState,
    callerUsername,
    callRejected,
    callingDialogVisible,
  } = useSelector(state => state.call);

  const hideCallRejectedDialog = callRejectedDetails => {
    dispatch(setCallRejected(callRejectedDetails));
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
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
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
      <ConversationButtons />
    </>
  );
};

export default DirectCall;
