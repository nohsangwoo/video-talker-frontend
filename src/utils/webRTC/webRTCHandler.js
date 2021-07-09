import store from '../../store/store';
import {
  setLocalStream,
  setCallState,
  callStates,
  setCallingDialogVisible,
  setCallerUsername,
} from '../../store/actions/callActions';
import * as wss from '../wssConnection/wssConnection';

const preOfferAnswers = {
  CALL_ACCEPTED: 'CALL_ACCEPTED',
  CALL_REJECTED: 'CALL_REJECTED',
  CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABE',
};

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
  // 전화가 가능한 상태인지 아닌지 판단하는 함수
  // 전화가 가능하면 true반환 아니면 false반환
  if (checkIfCallPossible()) {
    connectedUserSocketId = data.callerSocketId;
    store.dispatch(setCallerUsername(data.callerUsername));
    store.dispatch(setCallState(callStates.CALL_REQUESTED));
    // 전화가 불가능한 상태일때 작동하는 기능
  } else {
    //   전화 받는 사람이 어떤 결정을 했는지 caller에게 알려주는기능
    wss.sendPreOfferAnswer({
      callerSocektId: data.callerSocketId,
      answer: preOfferAnswers.CALL_NOT_AVAILABLE,
    });
  }
};

// 2단계? 전화왔을때 수락하는 기능
export const acceptIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    // 전화를 받기로 수락했다면 해당 내용을 정리해서 백엔드로 전달
    // (이때 백엔드는 받은정보를 다시 caller에게 전달해준다)
    callerSocektId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_ACCEPTED,
  });
};

// 2단계? 전화왔을때 거절하는 기능
export const rejectIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    // 전화를 거절하기로 수락했다면 해당 내용을 정리해서 백엔드로 전달
    // (이때 백엔드는 받은정보를 다시 caller에게 전달해준다)
    callerSocektId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_REJECTED,
  });

  // 저장된caller의 정보와 callState를 초기화
  resetCallData();
};

// callee가 전화를 받는다고 수락했다면 caller의 webRTC offer를 본격적으로 보낸다
export const handlePreOfferAnswer = data => {
  if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    // send webRTC offer
  } else {
    let rejectionReason;
    // callee가 거절한게아니라 다른이유에서(네트워크상태던 뭐던) 거절된 상태일때 거절이유를 변수에 저장
    if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
      rejectionReason = 'Callee is not able to pick up the call right now';
    } else {
      rejectionReason = 'Call rejected by the callee';
    }
  }
};

// 전화가 불가능한지 판단
export const checkIfCallPossible = () => {
  if (
    // 리덕스 스토어 call 안의  localStream의 내용이 null이거나
    // 리덕스 스토어에 저장된 callState가 CALL_AVAILABLE(사용 가능한)상태가 아니라면 false 값을 return
    store.getState().call.localStream === null ||
    store.getState().call.callState !== callStates.CALL_AVAILABLE
  ) {
    return false;
    // 위 조건의 여집합은 전부 true
  } else {
    return true;
  }
};

// call 관련 데이터 초기화
export const resetCallData = () => {
  connectedUserSocketId = null;
  store.dispatch(setCallState(callStates.CALL_AVAILABLE));
};
