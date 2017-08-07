import React from 'react';
import $ from 'jquery';

class NewVolunteerSlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      location_id: null,
      volunteer_date: null,
      start_time: null,
      end_time: null,
      num_volunteers_booked: 0,
      num_volunteers_needed: null
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

//dropdown input for courses filled with db values, id as invisible value
//dropdown for holes 9 or 18
//calendar for date
//time input fields
 render() {
    return (
    <div>
    <h3>For Event Locations with an Active Account</h3>
    <h4>Enter New Events Looking for Volunteers:</h4>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <p>
          <label>Verify Your Account:
            <br></br>
            Email: <input type='text' name='email' onChange={this.handleChange.bind(this)} /></label>
          &emsp;&emsp;&emsp;
          <label>Password: <input type='password' name='password' onChange={this.handleChange.bind(this)} /></label>
        </p>
        <p>
          <label>Event Date: <input type='date' name='volunteer_date' onChange={this.handleChange.bind(this)} /></label>
          &emsp;&emsp;
          <label>Shift Start Time: <input type='time' name='start_time' onChange={this.handleChange.bind(this)} /></label>
          &emsp;&emsp;
          <label>End Time: <input type='time' name='end_time' onChange={this.handleChange.bind(this)} /></label>
        </p>
        <p>
          <label>Volunteers Needed: <input type='text' name='num_volunteers_needed' onChange={this.handleChange.bind(this)} /></label>
          &emsp;&emsp;
        </p>
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        <input type='submit' value='Submit'/>
      </form>
    </div>
    )
  }
}

export default NewVolunteerSlot;
