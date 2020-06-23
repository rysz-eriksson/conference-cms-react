import React from 'react'

export default ({ lecture }) => {
    return (
        <tr>
            <td className='track_id'>{lecture.id}</td>
            <td>{lecture.stream_url}</td>
            <td>{lecture.stream_title}</td>
            <td>{lecture.lecturer_name}</td>
        </tr>
    )
}