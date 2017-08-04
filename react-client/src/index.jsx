import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PlayList from './components/PlayList.jsx';
import UserList from './components/UserList.jsx';
//var server_url = 'http://localhost:3000';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play_times: [],
      current_user: '',
      all_users: []
      //add logged in state to maintain
    }
  }

  componentDidMount() { //get request for all users and update state
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

  // optionally only display new user button if no current user exists
  // on click for new user redirect to NewUser form page
  // only display play a round button if current user exists
  // on click play button, redirect to NewPlayTime form page
  render () {
    return (<div>
      <h1>Welcome to Golf Partner Linkup</h1>
      <div>
        Select Your Name From Below or <button onClick=''>Create a New User Account</button>
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

ReactDOM.render(<App />, document.getElementById('app'));
