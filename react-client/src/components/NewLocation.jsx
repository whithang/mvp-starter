import React from 'react';
import $ from 'jquery';
// create entry form for all db fields & courses, multi option
// on submit, ensure not duplicate and alert error you already exist
// make state a dropdown field
// restrict size of input in fields and validity of email and int for handicap
// make password input be encrypted
class NewLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      phone: null,
      email: null,
      password: null,
      city: null,
      state: null,
      website: null
    };
  }

  handleChange(e) {
    var stateObj = {};
    stateObj[e.target.name] = $.trim(e.target.value);
    this.setState(stateObj);
  }

  handleSubmit(e){
    // this.setState({password: SHA2(this.state.password, 0)});
    // this.setState({golfer_data['method']: 'addGolfer'});
    this.props.submit(this.state);
  }

 render() {
    return (
    <div>
    <h3>Create a New Location for Volunteer Events:</h3>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <p>
          <label>Email / Login: <input type='text' name='email' onChange={this.handleChange.bind(this)} /></label>
          &emsp;&emsp;
          <label>Password: <input type='password' name='password' onChange={this.handleChange.bind(this)} /></label>
        </p>
        <p>
          <label>Volunteer Organization: <input type='text' name='name' onChange={this.handleChange.bind(this)} /></label>
          &emsp;&emsp;&emsp;
          <label>Phone: <input type='text' name='phone' onChange={this.handleChange.bind(this)} /></label>
        </p>
        <p>
          <label>City: <input type='text' name='city' onChange={this.handleChange.bind(this)} /></label>
          &emsp;&emsp;
          <label>State: <input type='text' name='state' onChange={this.handleChange.bind(this)} /></label>
        </p>
        <p>
          <label>Website: <input type='text' name='website' onChange={this.handleChange.bind(this)} /></label>
        </p>
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        <input type='submit' value='Submit'/>
      </form>
    </div>
    )
  }
}

export default NewLocation;
