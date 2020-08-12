import React from 'react';
import useData from '../hooks/useData';
import LectureItemVod from './lecturesItemVod';

export default () => {

  const vodMovies = useData('live-library')

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