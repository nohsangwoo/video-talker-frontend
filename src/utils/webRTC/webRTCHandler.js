import store from '../../store/store';
import {
  setLocalStream,
  setCallState,
  callStates,
  setCallingDialogVisible,
  setCallerUsername,
} from '../../store/actions/callActions';

import * as wss from '../wssConnection/wssConnection';
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

let connectedUserSocketId;

// 상대방에게 전화 거는 기능
// calleeDetails를 받아온다음
// 전화를 걸때 어떤 단계인지 구분하기위해 CALL_IN_PROGRESS단계라고 리덕스 스토어에 저장
// 또한 전화중이라고 다이얼로그(알림창같은거) 표시하는 조건을 만들기 위해 해당 정보제어를 위한 변수또한 리덕스에 저장
// 그리고 wssConnection.js의 sendPreOffer라는 함수로 백엔드에 전화를 건사람의 데이터와 , 전화를 걸(받을)사람의 데이터를 함께보낸다
export const callToOtherUser = calleeDetails => {
  connectedUserSocketId = calleeDetails.socketId;
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  store.dispatch(setCallingDialogVisible(true));
  wss.sendPreOffer({
    callee: calleeDetails,
    caller: {
      username: store.getState().dashboard.username,
    },
  });
};

// 전화를 거는 첫번째 단계에서 wssConnection.js를 통하여 백엔드에서 caller의 정보를 받아온다
// 누가 나에게 전화를 걸었는지에 대한 socketId를 connectedUserSocketId 라는 글로벌 변수에 저장하고
// 그후 리덕스스토어에 caller의 이름을저장하고
// 이 첫번째 단계가 끝나고 다음단계로 진행한다는 트리거를 건드리기 위해 리덕스의 callState를 CALL_REQUESTED로 변경한다
// 이제 callee가 전화를 수락하냐 거절하냐에 따라 다음단계에서 진행되는 내용이 결정됨
export const handlePreOffer = data => {
  connectedUserSocketId = data.callerSocketId;
  store.dispatch(setCallerUsername(data.callerUsername));
  store.dispatch(setCallState(callStates.CALL_REQUESTED));
};
