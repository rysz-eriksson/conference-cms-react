import React from 'react';
import LectureItemLive from './lecturesItemLive';
import useData from '../hooks/useData';

export default () => {
    
    const liveMovies = useData('live-library')

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
        {liveMovies.map((item) => (
            <LectureItemLive key={item.id} lecture={item} />
        ))}
        </tbody>
      </table>
    )
}