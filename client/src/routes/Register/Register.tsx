import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { StoreState } from "../../store/configureStore";
import {
  registerAction,
  clearErrorAction,
} from "../../store/actions/userActions";

import classes from "./Register.module.scss";

const Register = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated, error } = useSelector(
    (state: StoreState) => state.user
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const checkEmailInput = () => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      Swal.fire("Please provide a valid email");
    }
  };

  const handleSignUpClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      dispatch(registerAction(email, password));
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
        title: "Ups, something went wrong",
        text: error,
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      }).then(() => {
        handleError();
      });
      // Swal.fire(error);
    }
  }, [error]);

  if (isAuthenticated && token) {
    return <Redirect to={"/send-verify"} />;
  } else {
    return (
      <div className={classes.Register}>
        <div>
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
