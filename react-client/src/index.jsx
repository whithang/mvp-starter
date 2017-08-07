import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import VolunteerSlotList from './components/VolunteerSlotList.jsx';
import UserList from './components/UserList.jsx';
import NewUser from './components/NewUser.jsx';
import UserLogin from './components/UserLogin.jsx';
import NewVolunteerSlot from './components/NewVolunteerSlot.jsx';

//similar website: www.teeoffbuddies.com
//var server_url = 'http://localhost:3000';
// let user = {current_user: null, current_user_id: null};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volunteer_slots: [],
      // user: user,
      // current_user: user.current_user,
      // current_user_id: user.current_user_id,
      all_users: [],
      signin: false,
      new_account: false,
      new_volunteer_slot: false
      //add logged in state to maintain
    }
  }

  // componentWillUnmount() {
  //   user['current_user'] = this.state.current_user;
  //   user['current_user_id'] = this.state.current_user_id;
  // }

  componentDidMount() { //remove this once login works
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/users',
      success: (data) => {
        context.setState({
          all_users: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  signIn() {
    this.setState({
      signin: true
    });
  }

  authenticateUser(username, password) {
    var loginData = {'username': username, 'password': password};
    var context = this;
    $.ajax({
      method: 'POST',
      url: '/users',
      data: JSON.stringify(loginData),
      success: (data) => {
        if (data) {
          // context.setState({
          //   current_user: data.first_name,
          //   current_user_id: data.id
          // });
          // user.current_user = data.first_name;
          // user.current_user_id = data.id;
          context.setState({
            signin: false
          });
        }
      },
      error: (err) => {
        alert('Incorrect Login Information. Please try again or create a new user account.')
        console.log('err', err);
      }
    });
  }

  newAccount() {
    this.setState({
      new_account: true
    });
  }

  addUser(user_data) {
    var context = this;
    $.ajax({
      method: 'POST',
      url: '/users',
      data: JSON.stringify(user_data), //add data from the form
      success: (data) => {
        if (data) {
          //update playtimes to render
          //state is resetting so i don't know who just logged in
          //might need to set session and cookies
          // user.current_user_id = data.insertId;
          context.setState({
            new_account: false
          });
        }
      },
      error: (err) => {
        alert('Incorrect Login Information. Please try again or create a new user account.')
        console.log('err', err);
      }
    });
  }

  newVolunteerSlot(){
    this.setState({
      new_volunteer_slot: true
    });
  }

  addVolunteerSlot(volunteer_slot_data) {
    var context = this;
    $.ajax({
      method: 'POST',
      url: '/volunteer_slots',
      data: JSON.stringify(volunteer_slot_data), //add data from the form
      success: (data) => {
        if (data) {
          //update playtimes to render
          context.setState({
            new_volunteer_slot: false
          });
        }
      },
      error: (err) => {
        alert('Update Error. Please try again.')
        console.log('err', err);
      }
    });
  }
  // optionally only display new user button if no current user exists
  // on click for new user redirect to NewUser form page
  // only display play a round button if current user exists
  // on click play button, redirect to NewPlayTime form page
  // add menu on top for courses and then add a playtime to a course
  // add bootsrap for a menu at the top
  render () {
    if (this.state.signin) {
      return (
        <div><h1>Signin to Your Volunteer Account</h1>
          <UserLogin submit={this.authenticateUser.bind(this)}/>
        </div>)
      } else {
    if (this.state.new_account) {
      return (
        <div><h1>New Account on Volunteer Signup</h1>
          <NewUser submit={this.addUser.bind(this)}/>
        </div>)
      } else {
        if (this.state.new_volunteer_slot) {
          return (
            <div><h1>So Volunteers Can Find You</h1>
              <NewVolunteerSlot submit={this.addVolunteerSlot.bind(this)} />
            </div>)
          } else {
          return (<div>
            <h1>Welcome to Volunteer Signup</h1>
            <div>
              <button onClick={this.signIn.bind(this)}>Sign in</button> or <button onClick={this.newAccount.bind(this)}>Create a New User Account</button>
            </div>
            <br></br>
            <div>
              <UserList users={this.state.all_users}/>
            </div>
            <div>
              <button onClick={this.newVolunteerSlot.bind(this)}>When Do You Want to Volunteer?</button>
            </div>
            <VolunteerSlotList items={this.state.volunteer_slots}/>
          </div>)
        }
      }
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
