import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { StoreState } from "../../store/configureStore";
import { clearErrorAction } from "../../store/actions/userActions";
import {
  getUnasSignedLocksAction,
  // updateLockAction,
} from "../../store/actions/lockActions";
import { LockProps } from "../../store/reducers/lockReducer";
import Lock from "../../containers/Lock/Lock";

import classes from "./Settings.module.scss";

const Settings = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated, error } = useSelector(
    (state: StoreState) => state.user
  );

  useEffect(() => {
    // dispatch(loadUser());
    dispatch(getUnasSignedLocksAction());
    // socket.on("lockUpdate", (data) => {
    //   const { id, o1, o2, o3 } = data;
    //   dispatch(updateLockAction(id, o1, o2, o3));
    // });
  }, []);

  // const handleError = () => {
  //   dispatch(clearErrorAction());
  // };

  // useEffect(() => {
  //   if (error) {
  //     Swal.fire({
  //       title: "Ups, something went wrong",
  //       text: error,
  //       icon: "warning",
  //       showCancelButton: false,
  //       confirmButtonText: "OK",
  //     }).then(() => {
  //       handleError();
  //     });
  //   }
  // }, [error]);

  const locks: Array<LockProps> = useSelector(
    (state: StoreState) => state.lock.locks
  );

  useEffect(() => {}, [locks]);
  let lockComps = null;
  if (locks !== undefined && locks !== null) {
    lockComps = locks.map((lock: LockProps, index: number) => {
      return <Lock key={lock._id} index={index} />;
    });
  } else {
    lockComps = <></>;
  }

  // if (isAuthenticated && token) {
  //   return <Redirect to={"/login"} />;
  // } else {
  return (
    <div className={classes.Settings}>
      <div>
        <h4>Properties without locks:</h4>
      </div>
      <div>
        <h4>Available locks:</h4>
        {lockComps}
      </div>
    </div>
  );
  // }
};

export default Settings;
