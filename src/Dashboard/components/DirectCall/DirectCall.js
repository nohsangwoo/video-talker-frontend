import React from 'react';
import { connect } from 'react-redux';
import LocalVideoView from '../LocalVideoView/LocalVideoView';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';
import { useSelector } from 'react-redux';
import CallRejectedDialog from '../CallRejectedDialog/CallRejectedDialog';
import IncomingCallDialog from '../IncomingCallDialog/IncomingCallDialog';
import CallingDialog from '../CallingDialog/CallingDialog';

const DirectCall = props => {
  const { localStream, remoteStream } = props;
  const data = useSelector(state => state.call);
  console.log('redux call in Direct call', data);

  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}

      {/* 조건에 따라서 안내문 띄우기 */}
      {/* <CallRejectedDialog /> */}
      {/* <IncomingCallDialog /> */}
      {/* <CallingDialog /> */}
    </>
  );
};

function mapStoreStateToProps({ call }) {
  return {
    ...call,
  };
}

export default connect(mapStoreStateToProps, null)(DirectCall);
