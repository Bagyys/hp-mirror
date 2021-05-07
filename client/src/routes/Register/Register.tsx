import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { StoreState } from "../../store/configureStore";
import { registerAction } from "../../store/actions/userActions";

import classes from "./Register.module.scss";

const Register = () => {
  const dispatch = useDispatch();

  const { token, isAuthenticated } = useSelector(
    (state: StoreState) => state.user
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(registerAction(email, password));
  };

  if (isAuthenticated && token) {
    return <Redirect to={"/send-verify"} />;
  } else {
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
          <button onClick={handleSignUpClick}>Register</button>
          <h5>
            <Link to="/login">Already have an account?</Link>
          </h5>
        </div>
      </div>
    );
  }
};

export default Register;
