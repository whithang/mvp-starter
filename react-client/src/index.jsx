import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import VolunteerSlotList from './components/VolunteerSlotList.jsx';
import NewLocation from './components/NewLocation.jsx';
import NewUser from './components/NewUser.jsx';
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
      all_slots: [],
      signup: false,
      new_account: false,
      new_volunteer_slot: false,
      new_location: false
      //add logged in state to maintain
    }
  }

  // componentWillUnmount() {
  //   user['current_user'] = this.state.current_user;
  //   user['current_user_id'] = this.state.current_user_id;
  // }

  componentDidMount() { //remove this once login works
    // var context = this;
    // $.ajax({
    //   method: 'GET',
    //   url: '/users',
    //   success: (data) => {
    //     context.setState({
    //       all_users: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
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
      url: '/signup',
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
        alert('Incorrect Signup Information. Please try again.')
        console.log('err', err);
      }
    });
  }

  signUp() {
    this.setState({
      signup: true
    });
  }

  newVolunteerBooking(booking) {
    //will confirm user login correct and then create booking record
    var context = this;
    $.ajax({
      method: 'POST',
      url: '/booking',
      data: JSON.stringify(booking),
      success: (data) => {
        if (data) {
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

  newLocation() {
    this.setState({
      new_location: true
    });
  }

  addLocation(location_data) {
    var context = this;
    $.ajax({
      method: 'POST',
      url: '/locations',
      data: JSON.stringify(location_data), //add data from the form
      success: (data) => {
        if (data) {
          //update playtimes to render
          //state is resetting so i don't know who just logged in
          //might need to set session and cookies
          // user.current_user_id = data.insertId;
          context.setState({
            new_location: false
          });
        }
      },
      error: (err) => {
        alert('Incorrect Location Insert Information. Please try again.')
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

  getVolunteerSlots() {
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/volunteer_slots',
      success: (data) => {
        context.setState({
          all_slots: data
        })
      },
      error: (err) => {
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
    if (this.state.signup) {
      return (
        <div><h1>Signup to Volunteer!</h1>
          <VolunteerSlotList submit={this.newVolunteerBooking.bind(this)}/>
        </div>)
      } else {
    if (this.state.new_account) {
      return (
        <div><h1>New Volunteer Account on Volunteer Signup</h1>
          <NewUser submit={this.addUser.bind(this)}/>
        </div>)
      } else {
        if (this.state.new_volunteer_slot) {
          return (
            <div><h1>Add New Events So Volunteers Can Find You</h1>
              <NewVolunteerSlot submit={this.addVolunteerSlot.bind(this)} />
            </div>)
          } else {
            if (this.state.new_location) {
              return (
                <div><h1>Setup a New Volunteer Location on Volunteer Signup</h1>
                  <NewLocation submit={this.addLocation.bind(this)}/>
                </div>)
            } else {
            return (<div>
              <h1>Welcome to Volunteer Signup</h1>
              <div>
                <h3>For Volunteers:</h3>
                <button onClick={this.newAccount.bind(this)}>Create a New User Account</button> or <button onClick={this.signUp.bind(this)}>Sign up to Volunteer</button>
              </div>
              <br></br>
                <div>
                  <h3>For Locations:</h3>
                  <button onClick={this.newLocation.bind(this)}>Create a New Location Account</button> or <button onClick={this.newVolunteerSlot.bind(this)}>Post New Volunteer Events</button>
                </div>
                <br></br>
              <VolunteerSlotList items={this.state.volunteer_slots}/>
            </div>)
          }
        }
      }
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
