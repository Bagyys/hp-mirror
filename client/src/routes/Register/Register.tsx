import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { StoreState } from "../../store/configureStore";
import { ErrorState } from "../../store/reducers/errorReducer";
import { registerAction } from "../../store/actions/userActions";
import { clearErrorAction } from "../../store/actions/errorActions";

import classes from "./Register.module.scss";

const Register = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector(
    (state: StoreState) => state.user
  );
  const errorState: ErrorState = useSelector(
    (state: StoreState) => state.error
  );
  const { error } = errorState;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const checkEmailInput = () => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      Swal.fire("Please provide a valid email");
    }
  };

  const handleSignUpClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
    return <Redirect to={"/send-verify"} />;
  } else {
    return (
      <div className={classes.Register}>
        <form onSubmit={(event) => handleSignUpClick(event)}>
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
          <button type="submit">Register</button>
          <h5>
            <Link to="/login">Already have an account?</Link>
          </h5>
        </form>
      </div>
    );
  }
};

export default Register;
