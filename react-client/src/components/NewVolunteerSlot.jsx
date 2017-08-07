import React from 'react';
import $ from 'jquery';

class NewVolunteerSlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      golfer_id: this.props.id,
      golfer_name: '',
      course_id: '',
      play_date: '',
      holes: '',
      start_time: '',
      end_time: ''
    };
  }

  handleChange(e) {
    var stateObj = {};
    stateObj[e.target.name] = $.trim(e.target.value);
    this.setState(stateObj);
  }

  handleSubmit(e){
    // this.setState({password: SHA2(this.state.password, 0)});
    this.props.submit(this.state);
  }

  getUser(id) {
    var context = this;
    $.ajax({
      method: 'POST',
      url: '/golfers',
      data: JSON.stringify({'id': id}), //add data from the form
      success: (data) => {
        if (data) {
          //update playtimes to render
          context.setState({
            golfer_name: data.first_name
          });
        }
      },
      error: (err) => {
        alert('Update Error. Please try again.')
        console.log('err', err);
      }
    });
  }
//dropdown input for courses filled with db values, id as invisible value
//dropdown for holes 9 or 18
//calendar for date
//time input fields
 render() {
   this.getUser(this.props.id);
    return (
    <div>
    <h3>Hello {this.props.user}! Enter the Times You Want to Golf:</h3>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <p>
          <label>Select a Course: <input type='text' name='course_id' onChange={this.handleChange.bind(this)} /></label>
          &emsp;&emsp;&emsp;
          <label>Date You Want To Play a Round: <input type='text' name='play_date' onChange={this.handleChange.bind(this)} /></label>
        </p>
        <p>
          <label>Holes To Play: <input type='text' name='holes' onChange={this.handleChange.bind(this)} /></label>
          &emsp;&emsp;
          <label>Available Start Time: <input type='text' name='start_time' onChange={this.handleChange.bind(this)} /></label>
        </p>
        <p>
        <label>Available Until: <input type='text' name='end_time' onChange={this.handleChange.bind(this)} /></label>
        </p>
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        <input type='submit' value='Submit'/>
      </form>
    </div>
    )
  }
}

export default NewVolunteerSlot;
