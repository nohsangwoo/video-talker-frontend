# settingup frontend

# first wss connection

# apply react-router-dom

# install redux

# apply redux-devtoos-extension

# build login page and css

# set layout of Dashboard

# show user list

# emit test

# show connected user list(except me()

# userdisconnected

# get userStream using by getUserMedia and save redux store

# show user stream in dashboard

# save current call mode in redux

# creating dialogs related with direct calls

전화를 걸때, 거절받았을때. 전화가 올때(승낙,거절) 안내창 만들기
그리고 조건에 따라 만들어놓은 안내창 띄우기

# 전화 걸때 1단계의 caller, callee 상태 구현

- 1단계 : CALL_IN_PROGRESS 단계

# calle가 전화 수락했을때 거절했을때 분기점 초기 상황 구현 및 백엔드로 데이터 전달

# handlePreOfferAnswer

- callee가 전화를 거절했는지 수락했는지에대한 정보를 caller에게 전달하는 과정 구현

## rejectIncomingCallRequest, acceptIncomingCallRequest

- callee가 승낙 하거나 거절했을때 백엔드로 상태를 보내고
  백엔드는 다시 해당 내용을 caller에게 전달해준다

## creating peer connection

- 피어 연결을 위한 정보를 객체로 정리해서 만들어두던가 하여튼 연결을 위해 미리 준비해둠
- 이때 사용하고자하는 서버를 지정가능한데 여기선 iceServer에서 stun서버를 사용한다.

## creataing webRTC offer

수신자에게 SDP정보를 제공하기위해 만들어둔다.

## handling webRTC offer and creating webRTC answer

- sdp가 완료되면 생성이 완료되면 Caller의 setLocalDescription() 을 통해 로컬 SDP로 설정해주어야 한다.
- 설정이 완료되면 WebSocket 혹은 Socket.io (무엇이든 상관없다 본인에게 편한 것을 사용하자) 등을 통해 SDP와 candidate(아래 나올)를 Callee에게 전달하는데 이를 시그널링(Signaling)이라고 한다.
- 여기서 중요한 것은 Caller의 localDescription이 설정되어야 candidate를 수집할 수 있다.

- 설정이 완료되면 callee는 createAnswer()를 통해 Caller에게 보낼 SDP를 생성한다.

  WebRTC answer

  The createAnswer() method creates an SDP answer to an offer received from a remote peer during the offer/answer negotiation of a WebRTC connection.

## handle webRTC answer

callee가 연결 수락했을때 정보를 caller에게 보냄

## Exchanging ICE candidates

- 이제 ICE candidates 내용 교환한다.

  ICE candidates

  To establish direct connection between two peers exchanging information about the media(SDP) is not enough.

  Peers must exchange information about the network connection. This is known as an ICE candidate and details the available methods the peer is able to communicate (directly or through a TURN server). Typically, each peer will propose its best candidates first, making their way down the line toward their worse candidates. Ideally, candidates are UDP (since it's faster, and media streams are able to recover from interruptions relatively easily), but the ICE standard does allow TCP candidates as well.

  For more informations please check link below:

  https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Connectivity

## displaying remote stream

원격으로 stream정보를 받아서 연결하기(caller-callee)

## creating conversation buttons

- npm install react-icons --save

react-icon로 버튼 몇개 가져와서 적용시킨다

## Enabling/Disabling camera or microphone in active peer connection

- 카메라와 마이크 제어(control pannel)
- 내 오디오 정보 제어

```
localStream.getAudioTracks()[0].enabled = !micEnabled;
```

- 내 비디오 정보 제어

```
localStream.getVideoTracks()[0].enabled = !cameraEnabled;
```

## Screen sharing - add possibility to replace streams

- 화면 공유 기능

## add hang up possibility

- 전화 끊기 기능

## direct calls minor changes

- caller가 전화 걸고 단순변심으로 callee가 전화받기 이전에 취소하는 기능
- 다른사람이랑 통화중인상대에게는 전화걸지 못하게 막는 기능

## dashboard Information

- dashboard접속했을때(로긴시 home화면같은거) 안내문띄우고, 연화연결되면 안내문 없애고 그런 작동들 함..

## connecting with peerjs server

- peerjs로 서버와 통신 적용

## create rooms list

모킹용 그룹리스트 만들어놓고 화면에 렌더링

## adding create room button

- 그룹통화 방 으로 가는 버튼 생성 (기능 구현은 아직)

## store created room in server

## sending active rooms to all client

## adding create room functionality

- 그룹콜 버튼 누르면 새로운 방으로 입장하고 렌더링됨

## join group call

- 만들어진 방에 참여하는 기능

## calling to new user in group call

## preparing logic to display incoming streams

## displaying incoming streams

다른사람이 만든방에 참여하기
