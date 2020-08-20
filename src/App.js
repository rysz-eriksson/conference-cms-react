import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { auth } from '../firebase/firebase';
import { authChange } from './services/firebase-api';
import Navigation from './components/navigation'
import './App.css';

const App = () => {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const unsubscribe = authChange(setAuthUser);
    return () => {
      unsubscribe()
    }
  }, [])
  return (
    <Router>
      <Navigation authUser={authUser} />
    </Router>
  )
}

export default App;
