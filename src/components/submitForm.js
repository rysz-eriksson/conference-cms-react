import React from 'react';
import predefinedLect from '../data/lectures-list';
import database from '../firebase/firebase';
import styled from 'styled-components';

export const handleError = (err) => {
  alert('Action failed, see details in the console')
  console.log(err)
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
  }
  `

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
  }
  `

  const RadioButton = styled.fieldset`
  display: block;
  border: none;
  margin: 40px auto 0 240px;

  input[type="radio"] {
    margin: 5px;
}
  `

export default class SubmitForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fillInForms = this.fillInForms.bind(this);
    this.state = {
      content_type: 'vod',
      track_num: '1'
    }
  }

  handleSubmit(e) {
    const clearState = () => {
      this.setState({
        content_type: 'vod',
        track_num: '1',
        image_url: '',
        lecturer_name: '',
        stream_title: '',
        stream_url: ''
      })
    }
    e.preventDefault()
    if (this.state.content_type === 'vod') {
      database.ref('vod-library').push({
        stream_url: this.state.stream_url,
        stream_title: this.state.stream_title,
        lecturer_name: this.state.lecturer_name,
        image_url: this.state.image_url
      })
      .then(() => {
        clearState()
      })
      .catch((err) => {
        handleError(err)
      })
    } else {
      database.ref(`live-library/${this.state.track_num}`).set({
        stream_url: this.state.stream_url,
        stream_title: this.state.stream_title,
        lecturer_name: this.state.lecturer_name,
      })
      .then(() => {
        clearState()
      })
      .catch((err) => {
        handleError(err)
      })
    }

  }

  handleChange = (e) => {
    const { target: { name, value } } = e
    this.setState({ [name]: value })
  }

  fillInForms(e) {
    let selectedName = e.target.value
    this.setState({...predefinedLect.find(item => item.lecturer_name === selectedName)})
  }


    render() {
        return (
        <Form method="POST" id="myForm" className="form" onSubmit={this.handleSubmit}>
            <FormRow>
                <label htmlFor="lecturer_name">Lecturer Name</label>
                  <select id="lecturer_name" name="lecturer_name" onChange={this.fillInForms}>
                    <option value=''>Select name</option>
                    {predefinedLect.map(({ lecturer_name }) => (
                      <option value={lecturer_name} key={lecturer_name}>{lecturer_name}</option>
                    ))}
                  </select>
                </FormRow>
            <FormRow>
                <label htmlFor='stream_url'>Video URL</label>
                <input id='stream_url' name='stream_url' type='text' required placeholder="i.e. https://example.com/stream/master.m3u8" 
                value={this.state.stream_url} 
                onChange={this.handleChange} />
              </FormRow>
              <FormRow>
                <label htmlFor="stream_title">Lecture Title</label>
                <input id="stream_title" name="stream_title" type="text" required placeholder="i.e. What are kubernetes?" 
                value={this.state.stream_title} 
                onChange={this.handleChange} />
            </FormRow>
              <FormRow>
                  <label htmlFor="image_url">Image/Poster URL</label>
                  <input id="image_url" name="image_url" type="text" required placeholder="Please put url for thumbnail/poster image" 
                  value={this.state.image_url} 
                  onChange={this.handleChange} />
              </FormRow>
              <RadioButton>
                  <legend>Type of content</legend>
                  <input type="radio" id="live" name="content_type" value="live" 
                  checked={this.state.content_type === 'live'}
                  onChange={this.handleChange}/>
                  <label htmlFor="live" className="radio-label">Live</label>
                  <input type="radio" id="vod" name="content_type" value="vod" 
                  checked={this.state.content_type === 'vod'}
                  onChange={this.handleChange}/>
                  <label htmlFor="vod" className="radio-label">VoD</label>
              </RadioButton>
              {this.state.content_type === 'live' && 
              <div>
              <RadioButton>
              <legend>Which track?</legend>
              <input type="radio" id="track1" name="track_num" value="1" 
              checked={this.state.track_num === '1'}
              onChange={this.handleChange} />
              <label htmlFor="track1" className="radio-label">1</label>
              <input type="radio" id="track2" name="track_num" value="2" 
              checked={this.state.track_num === '2'}
              onChange={this.handleChange} />
              <label htmlFor="track2" className="radio-label">2</label>
              <input type="radio" id="track3" name="track_num" value="3" 
              checked={this.state.track_num === '3'}
              onChange={this.handleChange} />
              <label htmlFor="track3" className="radio-label">3</label>
              </RadioButton>
              </div>
            }
              <input type="submit" value="Submit"/>
        </Form>
        )
    }
}