import React from 'react';

// create entry form for all db fields & courses, multi option
// on submit, ensure not duplicate and alert error you already exist
// make state a dropdown field
// restrict size of input in fields and validity of email and int for handicap
// make password input be encrypted
const NewUser = (props) => (
  <div>
  <h3>Create a New User Account:</h3>
    <form onSubmit={props.submit}>
      <p>
        <label>Email / Login: <input type='text' name='email' /></label>
        &emsp;&emsp;
        <label>Password: <input type='text' name='password' /></label>
      </p>
      <p>
        <label>First Name: <input type='text' name='first_name' /></label>
        &emsp;&emsp;&emsp;
        <label>Last Name: <input type='text' name='last_name' /></label>
      </p>
      <p>
        <label>City: <input type='text' name='city' /></label>
        &emsp;&emsp;
        <label>State: <input type='text' name='state' /></label>
      </p>
      <p>
      <label>Phone: <input type='text' name='phone' /></label>
      &emsp;&emsp;
      <label>Golf Handicap: <input type='text' name='handicap' /></label>
      </p>
      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
      <input type='submit' value='Submit'/>
    </form>
  </div>
)

export default NewUser;
