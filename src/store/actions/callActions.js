export const CALL_SET_LOCAL_STREAM = 'CALL.SET_LOCAL_STEAM';

export const setLocalSteam = localStream => {
  return {
    type: CALL_SET_LOCAL_STREAM,
    localStream,
  };
};
