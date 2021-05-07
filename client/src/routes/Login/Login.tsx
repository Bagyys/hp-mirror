import React, { useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { StoreState } from "../../store/configureStore";
import { loginAction } from "../../store/actions/userActions";

import classes from "./Login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token, isAuthenticated } = useSelector(
    (state: StoreState) => state.user
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(loginAction({ email, password }));
    history.push("/login");
  };

  if (isAuthenticated && token) {
    return <Redirect to={"/"} />;
  } else {
    return (
      <div className={classes.Login}>
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
          <button onClick={(event) => handleLoginClick(event)}>Login</button>
          <h5>
            <Link to="/register">Don't have an account?</Link>
          </h5>
        </div>
      </div>
    );
  }
};

export default Login;
