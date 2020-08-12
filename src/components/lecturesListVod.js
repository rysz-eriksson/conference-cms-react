import React from 'react';
import LectureItemVod from './lecturesItemVod';

export default ({movies}) => {

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
    {movies.map((item, index) => (
    <LectureItemVod key={item.id} lecture={item} index={index}/>
    ))}
  </tbody>
</table>
    )
}