import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import { StoreState } from "../../store/configureStore";
import { userState } from "../../store/reducers/userReducer";
import {
  sendVerificationAction,
  clearErrorAction,
} from "../../store/actions/userActions";

import Spinner from "../../components/Spinner/Spinner";

import classes from "./SendVerify.module.scss";

const SendVerify = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const auth: userState = useSelector((state: StoreState) => state.user);
  const { user, isLoading, error } = auth;

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

  const submit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(sendVerificationAction(user.email));
    history.push("/reservations");
  };

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <div className={classes.sendVerifyContainer}>
        <div className={classes.sendVerifyWrapper}>
          <h1>An email with verification information was sent to: </h1>
          <p>
            <b>{user.email}</b>
          </p>
          <button className={classes.button} onClick={submit}>
            Send verification email again
          </button>
        </div>
      </div>
    );
  }
};

export default SendVerify;
