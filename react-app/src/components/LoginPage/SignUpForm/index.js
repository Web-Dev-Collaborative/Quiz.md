import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { signUp } from '../../../services/auth';
import { registerUser } from '../../../store/session';
const SignUpForm = (authenticated,setAuthenticated) => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const history = useHistory()


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = { username, email, password };
      const res = await dispatch(registerUser(user))
      return (res) ? history.push('/') :  alert("backend server issue")
    }
  };
  
  const updateUserName = (e) => {
    setUsername(e.target.value);
  }
  const updateEmail = (e) => {
    setEmail(e.target.value)
  }

  return (
    <form onSubmit={onSignUp}>
      <div className="group">
        <label className="label">User Name</label>
        <input
            // placeholder="Username"
                  className="input"
          type="text"
          name="username"
          onChange={updateUserName}
          value={username}
          required={true}
        ></input>
      </div>
      <div className="group">
        <label className="label">Email</label>
        <input
          className="input"  
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
        
      </div>
      <div className="group">
        <label className="label">Password</label>
              <input
          className="input"        
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required={true}
        ></input>
      </div>
      <div className="group">
        <label className="label">Repeat Password</label>
          <input
          className="input"        
          type="password"
          name="repeat_password"
          onChange={(e) =>setRepeatPassword(e.target.value)}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className="group">
            <input type="submit" className="button sign-in-btn" value="Sign Up"/>
          </div>
    </form>
  );
};

export default SignUpForm;
