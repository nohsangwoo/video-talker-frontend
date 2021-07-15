import store from '../../store/store';
import * as wss from '../wssConnection/wssConnection';

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
};

export const createNewGroupCall = () => {
  wss.registerGroupCall({
    username: store.getState().dashboard.username,
    peerId: myPeerId,
  });
};
