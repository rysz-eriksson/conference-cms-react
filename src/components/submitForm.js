import React, { useState } from 'react';
import predefinedLect from '../data/lectures-list';
import database from '../firebase/firebase';
import styled from 'styled-components';

export const handleError = (err) => {
  alert('Action failed, see details in the console')
  console.log(err)
} 

export default () => {
  const [ track_num, setTrackNum ] = useState('1')
  const [ content_type, setContentType ] = useState('vod')
  const [ record, setRecord ] = useState({})

  const handleSubmit = (e) => {
    const clearState = () => {
      setContentType('vod')
      setTrackNum('1')
      setRecord({
        image_url: '',
        lecturer_name: '',
        stream_title: '',
        stream_url: ''
      })
    }
    e.preventDefault()
    if (content_type === 'vod') {
      database.ref('vod-library').push(record)
      .then(() => {
        clearState()
      })
      .catch((err) => {
        handleError(err)
      })
    } else {
      database.ref(`live-library/${track_num}`).set({
        stream_url: record.stream_url,
        stream_title: record.stream_title,
        lecturer_name: record.lecturer_name,
      })
      .then(() => {
        clearState()
      })
      .catch((err) => {
        handleError(err)
      })
    }
  }

  const handleChange = (e) => {
    const { target: { name, value } } = e
    setRecord({...record, [name]: value })
  }

  const fillInForms = (e) => {
    let selectedName = e.target.value
    setRecord({...predefinedLect.find(item => item.lecturer_name === selectedName)})
  }

        return (
        <Form method="POST" id="myForm" className="form" onSubmit={handleSubmit}>
            <FormRow>
                <label htmlFor="lecturer_name">Lecturer Name</label>
                  <select id="lecturer_name" name="lecturer_name" onChange={fillInForms}>
                    <option value=''>Select name</option>
                    {predefinedLect.map(({ lecturer_name }) => (
                      <option value={lecturer_name} key={lecturer_name}>{lecturer_name}</option>
                    ))}
                  </select>
                </FormRow>
            <FormRow>
                <label htmlFor='stream_url'>Video URL</label>
                <input id='stream_url' name='stream_url' type='text' required placeholder="i.e. https://example.com/stream/master.m3u8" 
                value={record.stream_url} 
                onChange={handleChange} />
              </FormRow>
              <FormRow>
                <label htmlFor="stream_title">Lecture Title</label>
                <input id="stream_title" name="stream_title" type="text" required placeholder="i.e. What are kubernetes?" 
                value={record.stream_title} 
                onChange={handleChange} />
            </FormRow>
              <FormRow>
                  <label htmlFor="image_url">Image/Poster URL</label>
                  <input id="image_url" name="image_url" type="text" required placeholder="Please put url for thumbnail/poster image" 
                  value={record.image_url} 
                  onChange={handleChange} />
              </FormRow>
              <RadioButton>
                  <legend>Type of content</legend>
                  <input type="radio" id="live" name="content_type" value="live" 
                  checked={content_type === 'live'}
                  onChange={(e) => { setContentType(e.target.value) }}/>
                  <label htmlFor="live" className="radio-label">Live</label>
                  <input type="radio" id="vod" name="content_type" value="vod" 
                  checked={content_type === 'vod'}
                  onChange={(e) => { setContentType(e.target.value) }}/>
                  <label htmlFor="vod" className="radio-label">VoD</label>
              </RadioButton>
              {content_type === 'live' && 
              <div>
              <RadioButton>
              <legend>Which track?</legend>
              <input type="radio" id="track1" name="track_num" value="1" 
              checked={track_num === "1" }
              onChange={(e) => { setTrackNum(e.target.value) }}/>
              <label htmlFor="track1" className="radio-label">1</label>
              <input type="radio" id="track2" name="track_num" value="2" 
              checked={track_num === "2" }
              onChange={(e) => { setTrackNum(e.target.value) }}/>
              <label htmlFor="track2" className="radio-label">2</label>
              <input type="radio" id="track3" name="track_num" value="3" 
              checked={track_num === "3" }
              onChange={(e) => { setTrackNum(e.target.value) }}/>
              <label htmlFor="track3" className="radio-label">3</label>
              </RadioButton>
              </div>
            }
              <input type="submit" value="Submit"/>
        </Form>
        )
}

const Form = styled.form`
  width: 600px;
  margin: 40px auto;
  border: #f18700 solid 2px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;

  input[type='submit']{
    font-size: 16px;
    font-weight: bold;
    width: 100px;
    text-align: center;
    margin: 40px auto;
    color:  #f18700;
  
    background-color: white;
    border: solid 1px  #f18700;
    border-radius: 3px;
  
    padding: 10px 23px;
    cursor: pointer;
    transition: .15s ease-in-out 
  }

  input[type='submit']:active {
    transform: scale(0.99);
  }

  input[type='submit']:hover {
    background-color: #f18700;
    color: white;
  }

  input[type='submit']:focus {
    outline-color: rgba(190, 106, 0, 0.5);
  }`

  const FormRow = styled.div`
  margin: 40px 40px 0 40px;
  display: flex;
  flex-direction: row;
  justify-content:flex-start;

  input[type='text'],
  select {
    background-color: #FFFFFF;
    border: 1px solid #D6D9DC;
    width: 250px;
    height: initial;
    border-radius: 3px;
    width: 100%;
    padding: 7px;
    font-size: 14px;
  }`

  const RadioButton = styled.fieldset`
  display: block;
  border: none;
  margin: 40px auto 0 240px;

  input[type="radio"] {
    margin: 5px;
}`