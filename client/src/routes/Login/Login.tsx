import React, { useEffect, useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { StoreState } from "../../store/configureStore";
import { loginAction, clearErrorAction } from "../../store/actions/userActions";

import classes from "./Login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token, isAuthenticated, error } = useSelector(
    (state: StoreState) => state.user
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const checkEmailInput = () => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      Swal.fire("Please provide a valid email");
    }
  };

  const handleLoginClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      dispatch(loginAction({ email, password }));
      history.push("/login");
    } else {
      Swal.fire("Please provide a valid email");
    }
  };

  const handleError = () => {
    dispatch(clearErrorAction());
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: error,
        text: "Please try again",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      }).then(() => {
        handleError();
      });
    }
  }, [error]);

  if (isAuthenticated && token) {
    return <Redirect to={"/"} />;
  } else {
    return (
      <div className={classes.Login}>
        <form onSubmit={(event) => handleLoginClick(event)}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => checkEmailInput()}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Login</button>
          <h5>
            <Link to="/register">Don't have an account?</Link>
          </h5>
        </form>
      </div>
    );
  }
};

export default Login;
