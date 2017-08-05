import React from 'react';
import ReactDOM from 'react-dom';
// import Popup from 'react-popup';
import $ from 'jquery';
import PlayList from './components/PlayList.jsx';
import UserList from './components/UserList.jsx';
// import {Router, Route, Switch} from 'react-router';
//var server_url = 'http://localhost:3000';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play_times: [],
      current_user: '',
      all_users: [],
      signin: false,
      new_account: false
      //add logged in state to maintain
    }
  }

  componentDidMount() { //remove this once login works
    $.ajax({
      method: 'GET',
      url: '/golfers',
      success: (data) => {
        this.setState({
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

  authenticateGolfer() {
    $.ajax({
      method: 'GET',
      url: '/golfers',
      success: (data) => {
        if (data) {
          this.setState({
            current_user: data.first_name
          });
          this.setState({
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

  addGolfer() {
    $.ajax({
      method: 'POST',
      url: '/golfers',
      data: {}, //add data from the form
      success: (data) => {
        if (data) {
          //update playtimes to render
          this.setState({
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
  // optionally only display new user button if no current user exists
  // on click for new user redirect to NewUser form page
  // only display play a round button if current user exists
  // on click play button, redirect to NewPlayTime form page
  render () {
    if (this.state.signin) {
      return (
        <div><h1>Signin to Your Golf Partner Linkup Account</h1>
        </div>)
      } else {
    if (this.state.new_account) {
      return (
        <div><h1>Create a New Account on Golf Partner Linkup</h1>
        </div>)
      } else {
        return (<div>
          <h1>Welcome to Golf Partner Linkup</h1>
          <div>
            <button onClick={this.signIn.bind(this)}>Sign in</button> or <button onClick={this.newAccount.bind(this)}>Create a New User Account</button>
          </div>
          <br></br>
          <div>
            <UserList users={this.state.all_users}/>
          </div>
          <div>
            <button onClick=''>When Do You Want to Play a Round?</button>
          </div>
          <PlayList items={this.state.play_times}/>
        </div>)
      }
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
