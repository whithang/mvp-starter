import React from 'react';

// create entry form for all db fields & courses, multi option
// on submit, ensure not duplicate and alert error you already exist
// make state a dropdown field
// restrict size of input in fields and validity of email and int for handicap
// make password input be encrypted
class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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

  render() {
      return (<div>
        <form>
          <label>Email / Login: <input type='text' name='email' /></label>
          <label>Password: <input type='text' name='password' /></label>

          <input type='submit' value='Submit' />
        </form>
      </div>
    )
  }

}

export default UserLogin;
