import React from 'react'

export default ({ lecture }) => {
    return (
        <tr>
            <td className='content_id'></td>
            <td>{lecture.stream_url}</td>
            <td>{lecture.stream_title}</td>
            <td>{lecture.lecturer_name}</td>
            <td>{lecture.image_url}</td>
        </tr>
    )
}