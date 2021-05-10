import React, { useEffect, useState } from "react";
// import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

import { StoreState } from "../../store/configureStore";
import { loadUser } from "../../store/actions/userActions";
// import { clearErrorAction } from "../../store/actions/userActions";
import {
  getUnasSignedLocksAction,
  assignLockAction,
} from "../../store/actions/lockActions";
import { getPropertieswoLocksAction } from "../../store/actions/propertyActions";
import { LockProps } from "../../store/reducers/lockReducer";
import { PropertyProps } from "../../store/reducers/propertyReducer";
// import Lock from "../../containers/Lock/Lock";

import classes from "./Settings.module.scss";

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated, error } = useSelector(
    (state: StoreState) => state.user
  );
  const [selectedProperty, setSelectedProperty] = useState("select property");
  const [selectedLock, setSelectedLock] = useState("select lock");

  useEffect(() => {
    // dispatch(loadUser());
    dispatch(getPropertieswoLocksAction());
    dispatch(getUnasSignedLocksAction());
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
  const properties = useSelector((state: StoreState) => state.properties);

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
    dispatch(assignLockAction(selectedLock, selectedProperty));
  };
  // if (isAuthenticated && token) {
  //   return <Redirect to={"/login"} />;
  // } else {
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
            {selectedProperty}
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
            {selectedLock}
          </option>
          {lockOptions}
        </select>
      </div>
      <button onClick={handleAssign}>Assign</button>
    </div>
  );
  // }
};

export default Settings;
