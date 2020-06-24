import React from 'react';
import database from '../firebase/firebase';
import LectureItemVod from './lecturesItemVod';

export default class LecturesListVod extends React.Component {
    state = {
        vodLibrary: []
    }
    componentDidMount() {
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
            this.setState({vodLibrary: [...lectures]})
    })
}
    render() {
        return (
            <table id="vod-list">
      <thead>
        <tr>
          <th>content_id</th>
          <th>stream_id</th>
          <th>title</th>
          <th>lecturer_name</th>
          <th>image_url</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {this.state.vodLibrary.map((item) => (
        <LectureItemVod key={item.id} lecture={item} />
        ))}
      </tbody>
    </table>
        )
    }
}