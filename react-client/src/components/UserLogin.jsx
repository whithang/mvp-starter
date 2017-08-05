import React from 'react';

// create entry form for all db fields & courses, multi option
// on submit, ensure not duplicate and alert error you already exist
// make state a dropdown field
// restrict size of input in fields and validity of email and int for handicap
// make password input be encrypted
const UserLogin = (props) => (
  <div>
  <h3>Signin to Your Account:</h3>
    <form>
      <label>Email / Login: <input type='text' name='email' /></label>
      <label>Password: <input type='text' name='password' /></label>

      <input type='submit' value='Submit' />
    </form>
  </div>
)

export default UserLogin;
