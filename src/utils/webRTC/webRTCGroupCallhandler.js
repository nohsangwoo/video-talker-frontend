import store from '../../store/store';
import * as wss from '../wssConnection/wssConnection';
import {
  callStates,
  setCallState,
  setGroupCallActive,
} from '../../store/actions/callActions';
let myPeer;
let myPeerId;

export const connectWithMyPeer = () => {
  myPeer = new window.Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '5000',
  });

  myPeer.on('open', id => {
    console.log('succesfully connected with peer server');
    myPeerId = id;
    // console.log(id);
  });

  myPeer.on('call', call => {
    call.answer(store.getState().call.localStream);
    call.on('stream', incomingStream => {
      console.log('strean came');
      // ,incomingStream
    });
  });
};

export const createNewGroupCall = () => {
  wss.registerGroupCall({
    username: store.getState().dashboard.username,
    peerId: myPeerId,
  });

  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

export const joinGroupCall = (hostSocketId, roomId) => {
  const localStream = store.getState().call.localStream;

  wss.userWantsToJoinGroupCall({
    peerId: myPeerId,
    hostSocketId,
    roomId,
    localStreamId: localStream.id,
  });

  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

export const connectToNewUser = data => {
  const localStream = store.getState().call.localStream;

  const call = myPeer.call(data.peerId, localStream);
  call.on('stream', incomingStream => {
    console.log('stream came');
  });
};
