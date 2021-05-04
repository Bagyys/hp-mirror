import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import { StoreState } from "../../store/configureStore";
import { registerAction } from "../../store/actions/userActions";

import classes from "./Register.module.scss";

const Register = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log("email");
    console.log(email);
    console.log("password");
    console.log(password);
    dispatch(registerAction(email, password));
  };

  return (
    <div className={classes.Register}>
      <div>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {/* {error !== null ? <div className="error">{error}</div> : null} */}
        <button onClick={(event) => handleSignUpClick(event)}>Register</button>
        <h5>
          <Link to="/login">Already have an account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Register;
