import * as callActions from '../actions/callActions';

const initState = {
  localStream: null,
  callState: callActions.callStates.CALL_AVAILABLE,
};

const reducer = (state = initState, action) => {
  console.log('call reducer action: ', action.localStream);
  switch (action.type) {
    case callActions.CALL_SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.localStream,
      };
    case callActions.CALL_SET_CALL_STATE:
      return {
        ...state,
        callState: action.callState,
      };
    default:
      return state;
  }
};

export default reducer;
