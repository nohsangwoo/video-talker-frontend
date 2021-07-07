import React, { useEffect } from 'react';

import './App.css';
import connectWithWebSocket from './utils/wssConnection/wssConnection';

function App() {
  useEffect(() => {
    connectWithWebSocket();
  }, []);
  return <div className="App">hi its home</div>;
}

export default App;
