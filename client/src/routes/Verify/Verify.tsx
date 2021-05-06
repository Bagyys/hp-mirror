import React, { useState, useEffect, MouseEventHandler } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { StoreState } from "../../store/configureStore";
import { userState } from "../../store/reducers/userReducer";
import { verifyAction } from "../../store/actions/userActions";

import classes from "./Verify.module.scss";

const Verify = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<{ token: string }>();
  const auth: userState = useSelector((state: StoreState) => state.user);
  const user = auth.user;
  // let token = ""

  // useEffect(() => {
  //    token = params.token

  // }, []);

  useEffect(() => {
    if (params.token === undefined) {
      <div>... Loading ... </div>;
    } else {
      dispatch(verifyAction(params.token));
      history.push("/");
    }
  }, [params.token]);

  if (auth.isLoading) {
    return <div>... Loading ... </div>;
  } else {
    return <div className={classes.sendVerifyContainer}></div>;
  }
};

export default Verify;
