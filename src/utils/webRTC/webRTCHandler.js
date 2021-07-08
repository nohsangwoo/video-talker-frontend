import store from '../../store/store';
import {
  setLocalStream,
  setCallState,
  callStates,
} from '../../store/actions/callActions';
//  기본 세팅 - 이외의 많은 옵션을 줄수있음 검색 ㄱ
const defaultConstrains = {
  video: true,
  audio: true,
};

export const getLocalStream = () => {
  navigator.mediaDevices
    //   getUsermedia로 유저 stream을 불러올때 옵션을 줄수있음
    .getUserMedia(defaultConstrains)
    .then(stream => {
      console.log('webrtchandler stream :', stream);
      store.dispatch(setLocalStream(stream));
      //   현재 mode도
      store.dispatch(setCallState(callStates.CALL_AVAILABLE));
    })
    .catch(err => {
      console.log(
        'error occured when trying to get an access to get local stream'
      );
      console.log(err);
    });
};
