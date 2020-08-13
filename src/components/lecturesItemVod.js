import React from 'react'
import database from '../firebase/firebase';
import styled from 'styled-components';

const Button = styled.button`
    padding: 5px;
    background-color: white;
    cursor: pointer;
    &:focus {
        outline-color: #f18700;
    }
`

export default ({ lecture, index, handleRespAction }) => {

    const onDeleteAction = () => {
        database.ref(`vod-library/${lecture.id}`).remove()
        .then(() => {
            handleRespAction('success')
        })
        .catch((err) => {
            handleRespAction('error')
            console.error(err)
        })
    }
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{lecture.stream_url}</td>
            <td>{lecture.stream_title}</td>
            <td>{lecture.lecturer_name}</td>
            <td>{lecture.image_url}</td>
            <td><Button onClick={onDeleteAction}>Delete</Button></td>
        </tr>

    )
}