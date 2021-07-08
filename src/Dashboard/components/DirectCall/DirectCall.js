import React from 'react';
import { connect } from 'react-redux';
import LocalVideoView from '../LocalVideoView/LocalVideoView';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';
import { useSelector } from 'react-redux';

const DirectCall = props => {
  const { localStream, remoteStream } = props;
  const data = useSelector(state => state.call);
  console.log('redux call in Direct call', data);

  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
    </>
  );
};

function mapStoreStateToProps({ call }) {
  return {
    ...call,
  };
}

export default connect(mapStoreStateToProps, null)(DirectCall);
