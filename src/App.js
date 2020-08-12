import React from 'react';
import useData from './hooks/useData'
import SubmitForm from './components/submitForm';
import LecturesListVod from './components/lecturesListVod';
import LecturesListLive from './components/lecturesListLive';
import './App.css';

function App() {
  const liveMovies = useData('live-library')
  const vodMovies = useData('vod-library')
  
  return (
    <div className="App">
      <SubmitForm />
      <LecturesListLive movies={liveMovies} />
      <LecturesListVod movies={vodMovies}/>
    </div>
  );
}

export default App;
