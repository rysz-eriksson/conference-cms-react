import React from 'react';
import SubmitForm from './components/submitForm';
import LecturesListVod from './components/lecturesListVod';
import LecturesListLive from './components/lecturesListLive';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <SubmitForm />
      <LecturesListLive />
      <LecturesListVod />
    </div>
  );
}

export default App;
