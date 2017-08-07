import React from 'react';

//make users display better
const UserList = (props) => (
  <div>
    <ul>
      { props.users.map(user =>
        <li key={user.id}><b>Name:</b> {user.first_name} {user.last_name}
          <br></br>
          <b>Location:</b> {user.city}, {user.state}
          <br></br>
          <b>Email:</b> {user.email}
        </li>
      )}
    </ul>
  </div>
);

//use of this is deprecated and no longer needed, plugins available if you want
// UserList.propTypes = {
//   users: React.PropTypes.array
// };

export default UserList;
