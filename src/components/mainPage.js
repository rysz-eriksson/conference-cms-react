import React, { useState } from 'react';
import useData from '../hooks/useData'
import SubmitForm from './submitForm';
import LecturesListVod from './lecturesListVod';
import LecturesListLive from './lecturesListLive';
import SignOutForm from './signOutForm';
import Alert from '@material-ui/lab/Alert'

export default (props) => {
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
      {info === 'success' ? 'Action succesfully completed!' : 'Something went wrong - please see the deatils in the console'}
      </Alert>}
      <LecturesListLive movies={liveMovies} />
      <LecturesListVod movies={vodMovies} handleRespAction={handleRespAction} />
      <SignOutForm />
    </div>
  );
}
