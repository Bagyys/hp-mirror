import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import socket from "../../utilities/socketConnection";

import { StoreState } from "../../store/configureStore";
import { PropertyState } from "../../store/reducers/propertyReducer";
import { ErrorState } from "../../store/reducers/errorReducer";
import {
  getAllLocksAction,
  updateLockAction,
} from "../../store/actions/lockActions";
import { clearErrorAction } from "../../store/actions/errorActions";
import { LockProps } from "../../store/types/lockInterfaces";
import { PropertyInterface } from "../../store/types/propertyInterfaces";
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

  const { locks } = useSelector((state: StoreState) => state.lock);
  const propertyStore: PropertyState = useSelector(
    (state: StoreState) => state.property
  );
  const properties: Array<PropertyInterface> = propertyStore.properties;

  const errorState: ErrorState = useSelector(
    (state: StoreState) => state.error
  );
  const { error } = errorState;

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
