import React from 'react';
import predefinedLect from '../data/lectures-list';
import database from '../firebase/firebase';

export default class SubmitForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target);
    console.log(data.get('content_type'))
    if (data.get('content_type') === 'vod') {
      database.ref('vod-library').push({
        lecturer_name: data.get('lecturer_name'),
        stream_url: data.get('stream_url'),
        stream_title: data.get('stream_title'),
        image_url: data.get('image_url')
      })
    }
  }


    render() {
        return (
        <form method="POST" id="myForm" className="form" onSubmit={this.handleSubmit}>
            <div className='form-row'>
                <label htmlFor="lecturer_name">Lecturer Name</label>
                  <select id="lecturer_name" name="lecturer_name">
                    <option value=''>Select name</option>
                    {predefinedLect.map(({ lecturerName }) => (
                      <option value={lecturerName} key={lecturerName}>{lecturerName}</option>
                    ))}
                  </select>
                </div>
            <div className='form-row'>
                <label htmlFor='stream_url'>Video URL</label>
                <input id='stream_url' name='stream_url' type='text' required placeholder="i.e. https://example.com/stream/master.m3u8"/>
              </div>
              <div className="form-row">
                <label htmlFor="stream_title">Lecture Title</label>
                <input id="stream_title" name="stream_title" type="text" required placeholder="i.e. What are kubernetes?" />
            </div>
              <div className="form-row">
                  <label htmlFor="image_url">Image/Poster URL</label>
                  <input id="image_url" name="image_url" type="text" required placeholder="Please put url for thumbnail/poster image" />
              </div>
              <fieldset className="radio-button">
                  <legend>Type of content</legend>
                  <input type="radio" id="live" name="content_type" value="live" />
                  <label htmlFor="live" className="radio-label">Live</label>
                  <input type="radio" id="vod" name="content_type" value="vod" />
                  <label htmlFor="vod" className="radio-label">VoD</label>
              </fieldset>
              <input type="submit" value="Submit" className="form-row submit-button" />
        </form>
        )
    }
}