import React from 'react';

// create entry form for all db fields & courses, multi option
// on submit, ensure not duplicate and alert error you already exist
// make state a dropdown field
// restrict size of input in fields and validity of email and int for handicap
// make password input be encrypted
const NewUser = (props) => (
  <h1>Create a New User Account:</h1>
  <div>
    <form>
      <label>Email / Login: <input type='text' name='email' /></label>
      <label>Password: <input type='text' name='password' /></label>
      <br></br>
      <label>First Name: <input type='text' name='first_name' /></label>
      <label>Last Name: <input type='text' name='last_name' /></label>
      <br></br>
      <label>Phone: <input type='text' name='phone' /></label>
      <label>City: <input type='text' name='city' /></label>
      <label>State: <input type='text' name='state' /></label>
      <br></br>
      <label>Golf Handicap: <input type='text' name='handicap' /></label>
      <input type='submit' value='Submit' />
    </form>
  </div>
)

export default NewUser;
