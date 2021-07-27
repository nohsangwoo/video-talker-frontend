import React, { useState, useEffect } from 'react';
import { sendMessageUsingDataChannel } from '../../../utils/webRTC/webRTCHandler';
import MessageDisplayer from './MessageDisplayer';
// import { useSelector } from 'react-redux';
import './Messenger.css';

const Messenger = ({ message, setDirectCallMessage }) => {
  const [inputValue, setInputValue] = useState('');
  //   const {
  //     call: { message },
  //   } = useSelector(state => state);

  const handleOnKeyDownEvent = e => {
    console.log('키다운 작동', e.keyCode);

    if (e.keyCode === 13) {
      console.log('키다운 작동');
      sendMessageUsingDataChannel(inputValue);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (message.received) {
      setTimeout(() => {
        setDirectCallMessage(false, '');
      }, [3000]);
    }
    // eslint-disable-next-line
  }, [message.received]);

  return (
    <>
      <input
        className="messages_input"
        type="text"
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value);
        }}
        onKeyDown={handleOnKeyDownEvent}
        placeholder="Type Your message"
      />
      {message.received && <MessageDisplayer message={message.content} />}
    </>
  );
};

export default Messenger;
