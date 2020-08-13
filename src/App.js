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
    setTimeout(changeShowAlert, 3000)
  }

  return (
    <div className="App">
      <SubmitForm handleRespAction={handleRespAction}/>
      {showAlert && <Alert severity={info}>
      {info === 'success' ? 'Action succesfully completed!' : 'Something went wrong - please see the deatils in teh console'}
      </Alert>}
      <LecturesListLive movies={liveMovies} />
      <LecturesListVod movies={vodMovies} handleRespAction={handleRespAction} />
    </div>
  );
}

export default App;
