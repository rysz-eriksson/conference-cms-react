import React, { useState, useEffect } from 'react';
import { authChange } from './services/firebase-api';
import MainPage from './components/mainPage';
import SignInPage from './components/signInPage';
import './App.css';

const App = () => {
  const [authUser, setAuthUser] = useState(null)

  let loadedComponent 
  if (authUser === 'on') {
    loadedComponent = <MainPage />
  } else if (authUser === 'off') {
    loadedComponent = <SignInPage />
  }
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
      {authUser ? loadedComponent : <p>Loading</p>}
    </div>
  )
}

export default App;
