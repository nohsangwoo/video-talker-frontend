import React from 'react';
import socektClient from 'socket.io-client';
import store from '../../store/store';
import * as dashboardActions from '../../store/actions/dashboardAction';
import * as webRTCHandler from '../webRTC/webRTCHandler';
const SERVER = 'http://localhost:5000';

const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
  GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS',
};

let socket;

export const connectWithWebSocket = () => {
  socket = socektClient(SERVER);

  socket.on('connection', () => {
    console.log('succesfully connected with wss server');
    console.log(socket.id);
  });

  //   전체 방송으로 전달받은 이벤트 처리
  socket.on('broadcast', data => {
    console.log('broadcast data: ', data);
    handleBroadcastEvents(data);
  });

  // listeners related with direct call
  //  전화를 거는 첫번째 단계에서 전화를 받는 대상인 callee가 백엔드에서 귓속말을 받았을때 처리하는 함수
  socket.on('pre-offer', data => {
    webRTCHandler.handlePreOffer(data);
  });
};

export const registerNewUser = username => {
  console.log('register-new-user front end func', username);
  socket.emit('register-new-user', {
    username,
    socketId: socket.id,
  });
};

// emititing events to server related with direct call
// 전화를 거는 첫번째 단계에서 백엔드에 caller와 calle의 정보를 모두 포함하여 전달한다.
export const sendPreOffer = data => {
  socket.emit('pre-offer', data);
};

// 전화받는사람(callee)이 어떤 결정을 했는지 caller에게 알려주는 기능
export const sendPreOfferAnswer = data => {
  socket.emit('pre-offer-answer', data);
};

// 전체방송으로 받은 데이터 이벤트 처리
const handleBroadcastEvents = data => {
  switch (data.event) {
    //   유저 최신화의 경우
    case broadcastEventTypes.ACTIVE_USERS:
      // client login user를 제외한 나머지 사람만 표시되게 함
      // 즉 나를 제외한 나머지 사람만 activeUser의 목록에 들어가게 한다
      const activeUsers = data.activeUsers.filter(
        activeUser => activeUser.socketId !== socket.id
      );
      // 필터된 나를 제외한 접속한 모든 유저 리스트를 activeUsers라는 리덕스 스토어에 저장
      store.dispatch(dashboardActions.setActiveUsers(activeUsers));
      break;
    default:
      break;
  }
};
