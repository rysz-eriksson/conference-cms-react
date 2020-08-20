import React, { useState, useEffect } from 'react';
import { authChange } from './services/firebase-api';
import MainPage from './components/mainPage';
import SignInPage from './components/signInPage';
import './App.css';

const App = () => {
  const [authUser, setAuthUser] = useState()

  useEffect(() => {
    const unsubscribe = authChange((user) => {
      if (user) {
        setAuthUser('on')
      } else {
        setAuthUser('off')
      }
    });
    return () => {
      unsubscribe()
    }
  }, [])
  return (
    <div>
      {authUser === 'off' ? <SignInPage /> : <MainPage /> }
    </div>
  )
}

export default App;
