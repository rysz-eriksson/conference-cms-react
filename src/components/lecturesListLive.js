import React from 'react';
import LectureItemLive from './lecturesItemLive';

export default ({movies}) => {
    return (
        <table>
        <thead>
          <tr>
            <th>track_id</th>
            <th>stream_id</th>
            <th>title</th>
            <th>lecturer_name</th>
          </tr>
        </thead>
        <tbody>
        {movies.map((item) => (
            <LectureItemLive key={item.id} lecture={item} />
        ))}
        </tbody>
      </table>
    )
}