import React from 'react';

//make users display better
const UserList = (props) => (
  <div>
    <ul>
      { props.users.map(user =>
        <li key={user.id}><b>Name:</b> {user.first_name} {user.last_name}
          <br></br>
          <b>Handicap:</b> {user.handicap ? user.handicap : 'N/A'}
          <br></br>
          <b>Location:</b> {user.city}, {user.state}
          <br></br>
          <b>Email:</b> {user.email}
        </li>
      )}
    </ul>
  </div>
)

export default UserList;
