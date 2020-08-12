import React, { useState, useEffect} from 'react';
import database from '../firebase/firebase';
import LectureItemLive from './lecturesItemLive';

export default () => {

    const [liveMovies, setMovies] = useState([])

    useEffect(() => {
        database.ref('live-library').on('value', (snapshot) => {
            let lectures = []
            snapshot.forEach((childSnap) => {
                lectures.push({
                    id: childSnap.key,
                    ...childSnap.val()
                })
                setMovies([...lectures])
        })
    }, (err) => {
        alert(err)
        })
    }, [])

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

// export default class LecturesListLive extends React.Component {
//     state = {
//         liveMovies: []
//     }
//     componentDidMount() {
//         database.ref('live-library').on('value', (snapshot) => {
//             let lectures = []
//             snapshot.forEach((childSnap) => {
//                 lectures.push({
//                     id: childSnap.key,
//                     ...childSnap.val()
//                 })
//                 this.setState({liveMovies: [...lectures]})
//         })
//     }, (err) => {
//         alert(err)
//         })
//     }
//     render() {
//         const { liveMovies } = this.state;
//         return (
//             <table>
//             <thead>
//               <tr>
//                 <th>track_id</th>
//                 <th>stream_id</th>
//                 <th>title</th>
//                 <th>lecturer_name</th>
//               </tr>
//             </thead>
//             <tbody>
//             {liveMovies.map((item) => (
//                 <LectureItemLive key={item.id} lecture={item} />
//             ))}
//             </tbody>
//           </table>
//         )
//     }
// }