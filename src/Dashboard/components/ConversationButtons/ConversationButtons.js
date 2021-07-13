import React from 'react';
import {
  MdCallEnd,
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideocamOff,
  MdVideoLabel,
  MdVideoCall,
  MdCamera,
} from 'react-icons/md';
import ConversationButton from './ConversationButton';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
} from '../../../store/actions/callActions';
import { switchForScreenSharingStream } from '../../../utils/webRTC/webRTCHandler';

const styles = {
  buttonContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: '22%',
    left: '35%',
  },
  icon: {
    width: '25px',
    height: '25px',
    fill: '#e6e5e8',
  },
};

// localCameraEnabled: true,
// localMicrophoneEnabled: true
const ConversationButtons = props => {
  const dispatch = useDispatch();

  const {
    localStream,
    localCameraEnabled,
    localMicrophoneEnabled,
    screenSharingActive,
  } = useSelector(state => state.call);

  console.log('screenSharingActive: ', screenSharingActive);

  const setCameraEnabled = enabled => {
    dispatch(setLocalCameraEnabled(enabled));
  };

  const setMicrophoneEnabled = enabled => {
    dispatch(setLocalMicrophoneEnabled(enabled));
  };

  const handleMicButtonPressed = () => {
    const micEnabled = localMicrophoneEnabled;
    console.log(localStream.getAudioTracks()[0].enabled);
    // 내 오디오 정보 토글
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicrophoneEnabled(!micEnabled);
  };

  const handleCameraButtonPressed = () => {
    const cameraEnabled = localCameraEnabled;
    // 내 비디오 정보 토글
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };

  const handleScreenSharingButtonPressed = () => {
    switchForScreenSharingStream();
  };
  return (
    <div style={styles.buttonContainer}>
      <ConversationButton onClickHandler={handleMicButtonPressed}>
        {localMicrophoneEnabled ? (
          <MdMic style={styles.icon} />
        ) : (
          <MdMicOff style={styles.icon} />
        )}
      </ConversationButton>
      <ConversationButton>
        <MdCallEnd style={styles.icon} />
      </ConversationButton>
      <ConversationButton onClickHandler={handleCameraButtonPressed}>
        {localCameraEnabled ? (
          <MdVideocam style={styles.icon} />
        ) : (
          <MdVideocamOff style={styles.icon} />
        )}
      </ConversationButton>
      <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
        {screenSharingActive ? (
          <MdCamera style={styles.icon} />
        ) : (
          <MdVideoLabel style={styles.icon} />
        )}
      </ConversationButton>
    </div>
  );
};

export default ConversationButtons;
