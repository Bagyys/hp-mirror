import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { StoreState } from "../../store/configureStore";
import {
  getUnasSignedLocksAction,
  assignLockAction,
  throwErrorAction,
  clearErrorAction,
} from "../../store/actions/lockActions";
import { getPropertieswoLocksAction } from "../../store/actions/propertyActions";
import { LockProps } from "../../store/reducers/lockReducer";
import { PropertyProps } from "../../store/reducers/propertyReducer";

import classes from "./Settings.module.scss";

const Settings = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedLock, setSelectedLock] = useState("");

  const handleError = () => {
    dispatch(clearErrorAction());
  };

  useEffect(() => {
    dispatch(getPropertieswoLocksAction());
    dispatch(getUnasSignedLocksAction());
  }, []);

  const { locks, error } = useSelector((state: StoreState) => state.lock);
  const properties = useSelector((state: StoreState) => state.properties);

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
    }
  }, [error]);

  useEffect(() => {}, [locks, properties]);

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

  let propertyOptions = null;
  if (properties !== undefined && properties !== null) {
    propertyOptions = properties.map(
      (property: PropertyProps, index: number) => {
        return (
          <option
            key={index}
            value={property._id}
          >{`${property.title}, ${property.location.addressString1}, ${property.location.city},
        ${property.location.zipcode} ${property.location.country}`}</option>
        );
      }
    );
  } else {
    propertyOptions = <></>;
  }
  const handleAssign = () => {
    // check selected properties ?
    if (selectedLock && selectedProperty) {
      dispatch(assignLockAction(selectedLock, selectedProperty));
      history.push("/locks");
    } else {
      dispatch(throwErrorAction("select lock and property"));
    }
  };

  return (
    <div className={classes.Settings}>
      <h1>Assign lock to property</h1>
      <div className={classes.Properties}>
        <h4>Properties without locks:</h4>
        <select
          defaultValue={selectedProperty}
          onChange={(e) => setSelectedProperty(e.target.value)}
        >
          <option value={selectedProperty} disabled>
            select property
          </option>
          {propertyOptions}
        </select>
      </div>
      <div className={classes.Locks}>
        <h4>Available locks:</h4>
        <select
          defaultValue={selectedLock}
          onChange={(e) => setSelectedLock(e.target.value)}
        >
          <option value={selectedLock} disabled>
            select lock
          </option>
          {lockOptions}
        </select>
      </div>
      <button onClick={handleAssign}>Assign</button>
    </div>
  );
};

export default Settings;