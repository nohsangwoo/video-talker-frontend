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

피어 연결을 위한 정보를 객체로 정리해서 만들어두던가 하여튼 연결을 위해 미리 준비해둠
