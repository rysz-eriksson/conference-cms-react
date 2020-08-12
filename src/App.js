import React, {useState} from 'react';
import useData from './hooks/useData'
import SubmitForm from './components/submitForm';
import LecturesListVod from './components/lecturesListVod';
import LecturesListLive from './components/lecturesListLive';
import Alert from '@material-ui/lab/Alert'
import './App.css';

function App() {
  const [showAlert, setShowAlert] = useState(false)
  const [info, setInfo] = useState()
  const liveMovies = useData('live-library')
  const vodMovies = useData('vod-library')

  const changeShowAlert = () => {
    setShowAlert(false)
  }
  
  const handleRespAction = (message) => {
    setInfo(message);
    setShowAlert(true);
    setTimeout(changeShowAlert, 2000)
  }

  return (
    <div className="App">
      {showAlert && <Alert severity={info}>
      {info === 'success' ? 'Action succesfully completed!' : 'Something went wrong - please see the deatils in teh console'}
      </Alert>}
      <SubmitForm handleRespAction={handleRespAction}/>
      <LecturesListLive movies={liveMovies} />
      <LecturesListVod movies={vodMovies}/>
    </div>
  );
}

export default App;
