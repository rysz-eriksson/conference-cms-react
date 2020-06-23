import React from 'react';
import database from '../firebase/firebase';
import LectureItemLive from './lecturesItemLive';

export default class LecturesListLive extends React.Component {
    state = {
        liveLibrary: []
    }
    componentDidMount() {
        database.ref('live-library').on('value', (snapshot) => {
            let lectures = []
            snapshot.forEach((childSnap) => {
                lectures.push({
                    id: childSnap.key,
                    ...childSnap.val()
                })
                this.setState({liveLibrary: [...lectures]})
        })
    })
}
    render() {
        return (
            <table id="live-list">
            <thead>
              <tr>
                <th>track_id</th>
                <th>stream_id</th>
                <th>title</th>
                <th>lecturer_name</th>
              </tr>
            </thead>
            <tbody>
            {this.state.liveLibrary.map((item) => (
                <LectureItemLive key={item.id} lecture={item} />
            ))}
            </tbody>
          </table>
        )
    }
}