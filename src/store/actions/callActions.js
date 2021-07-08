export const CALL_SET_LOCAL_STREAM = 'CALL.SET_LOCAL_STEAM';

export const setLocalStream = localStream => {
  console.log('setLocalStream 작동 localstream: ', localStream);
  return {
    type: CALL_SET_LOCAL_STREAM,
    localStream,
  };
};
