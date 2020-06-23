import React from 'react'
import database from '../firebase/firebase';

export default ({ lecture }) => {

    const onDeleteAction = () => {
        database.ref(`vod-library/${lecture.id}`).remove()
    }
    return (
        <tr>
            <td className='content_id'></td>
            <td>{lecture.stream_url}</td>
            <td>{lecture.stream_title}</td>
            <td>{lecture.lecturer_name}</td>
            <td>{lecture.image_url}</td>
            <td><button className="delete" onClick={onDeleteAction}>Delete</button></td>
        </tr>
    )
}