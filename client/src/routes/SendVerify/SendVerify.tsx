import React, { useState, useEffect, MouseEventHandler } from "react";
import { useSelector, useDispatch } from "react-redux";

import { StoreState } from "../../store/configureStore";
import { userState } from "../../store/reducers/userReducer";
import { sendVerificationAction } from "../../store/actions/userActions";

import classes from "./SendVerify.module.scss";

const SendVerify = () => {
  const dispatch = useDispatch();
  const auth: userState = useSelector((state: StoreState) => state.user);
  const user = auth.user;

  const submit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(sendVerificationAction(user.email));
  };

  if (auth.isLoading) {
    return <div>... Loading ... </div>;
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
