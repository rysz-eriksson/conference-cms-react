import React, { useState, useEffect } from 'react';
import database from '../firebase/firebase';
import LectureItemVod from './lecturesItemVod';

export default () => {

   const [vodMovies, setMovies] = useState([])

    useEffect(() => {
        database.ref('vod-library').on('value', (snapshot) => {
            let lectures = []
            if (snapshot.val() !== null) {
                snapshot.forEach((childSnap) => {
                    lectures.push({
                        id: childSnap.key,
                        ...childSnap.val()
                    })
                })
            }
            setMovies([...lectures])
    }, (err) => {
        alert(err)
        })
    }, [])

    return (
        <table>
  <thead>
    <tr>
      <th>Lp.</th>
      <th>stream_id</th>
      <th>title</th>
      <th>lecturer_name</th>
      <th>image_url</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {vodMovies.map((item, index) => (
    <LectureItemVod key={item.id} lecture={item} index={index}/>
    ))}
  </tbody>
</table>
    )
}