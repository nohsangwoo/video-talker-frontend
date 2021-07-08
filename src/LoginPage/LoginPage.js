import React, { useState } from 'react';
import './LoginPage.css';
import logo from '../assets/logo.png';
import SubmitButton from './components/SubmitButton';
import UsernameInput from './components/UsernameInput';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUsernameRedux } from '../store/actions/dashboardAction';
import { registerNewUser } from '../utils/wssConnection/wssConnection';
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmitButtonPressed = () => {
    //   submit버튼을 누르면 실행되는 내용
    // registerNewUser를 socket.io-client가 제어하도록 함
    registerNewUser(username);
    dispatch(setUsernameRedux(username));
    history.push('/dashboard');
  };
  return (
    <div className="login-page_container background_main_color">
      <div className="login-page_login_box background_secondary_color">
        <div className="login-page_logo_container">
          <img
            className="login-page_logo_image"
            src={logo}
            alt="video-talker"
          />
        </div>
        <div className="login-page_title_container">
          <h2>Get on Board</h2>
        </div>
        <UsernameInput username={username} setUsername={setUsername} />
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
      </div>
    </div>
  );
};

export default LoginPage;
