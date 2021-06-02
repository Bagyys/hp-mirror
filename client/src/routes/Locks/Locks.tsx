import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import socket from "../../utilities/socketConnection";

import { StoreState } from "../../store/configureStore";
import {
  getAllLocksAction,
  updateLockAction,
  clearErrorAction,
} from "../../store/actions/lockActions";
import { LockProps } from "../../store/types/lockInterfaces";
import Lock from "../../containers/Lock/Lock";

import classes from "./Locks.module.scss";

const Locks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLocksAction());
    socket.on("lockUpdate", (data) => {
      const { id, o1, o2, o3 } = data;
      dispatch(updateLockAction(id, o1, o2, o3));
    });
  }, []);

  const { locks, error } = useSelector((state: StoreState) => state.lock);
  const properties = useSelector(
    (state: StoreState) => state.property.properties
  );

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: error,
        text: "Ups, something went wrong",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      }).then(() => {
        handleError();
      });
    }
  }, [error]);

  useEffect(() => {}, [locks, properties]);

  const handleError = () => {
    dispatch(clearErrorAction());
  };

  let lockComps = null;
  if (locks !== undefined && locks !== null) {
    lockComps = locks.map((lock: LockProps, index: number) => {
      return <Lock key={lock._id} index={index} />;
    });
  } else {
    lockComps = <></>;
  }

  let lockOptions = null;
  if (locks !== undefined && locks !== null) {
    lockOptions = locks.map((lock: LockProps, index: number) => {
      return (
        <option key={index} value={lock._id}>
          {lock._id}
        </option>
      );
    });
  } else {
    lockOptions = <></>;
  }

  return (
    <div className={classes.Locks}>
      <h1>Handle locks</h1>
      {lockComps}
    </div>
  );
};

export default Locks;
