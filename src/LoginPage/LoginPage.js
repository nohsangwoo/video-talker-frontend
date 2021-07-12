import React, { useState } from 'react';
import logo from '../resources/logo.png';
import UsernameInput from './components/UsernameInput';
import SubmitButton from './components/SubmitButton';
import { useHistory } from 'react-router-dom';
import { setUsername } from '../store/actions/dashboardActions';
import { registerNewUser } from '../utils/wssConnection/wssConnection';
import './LoginPage.css';

import { useDispatch } from 'react-redux';

const LoginPage = () => {
  const [username, setOriginUsername] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmitButtonPressed = () => {
    registerNewUser(username);
    saveUsername(username);
    history.push('/dashboard');
  };

  const saveUsername = username => {
    dispatch(setUsername(username));
  };
  return (
    <div className="login-page_container background_main_color">
      <div className="login-page_login_box background_secondary_color">
        <div className="login-page_logo_container">
          <img className="login-page_logo_image" src={logo} alt="VideoTalker" />
        </div>
        <div className="login-page_title_container">
          <h2>Get on Board</h2>
        </div>
        <UsernameInput username={username} setUsername={setOriginUsername} />
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
      </div>
    </div>
  );
};

export default LoginPage;
