import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { StoreState } from "../../store/configureStore";
import {
  getUnassignedLocksAction,
  assignLockAction,
  unassignLockAction,
  throwErrorAction,
  clearErrorAction,
} from "../../store/actions/lockActions";
import {
  getPropertieswoLocksAction,
  getAllPropertiesAction,
} from "../../store/actions/propertyActions";
import { LockProps } from "../../store/types/lockInterfaces";
import { PropertyInterface } from "../../store/types/propertyInterfaces";

import classes from "./Settings.module.scss";

const Settings = () => {
  const dispatch = useDispatch();
  // const history = useHistory();

  const [selectedPropertyWithLock, setSelectedPropertyWithLock] = useState("");
  const [selectedPropertyWithoutLock, setSelectedPropertyWithoutLock] =
    useState("");
  const [selectedLock, setSelectedLock] = useState("");
  const [LockOfProperty, setLockOfProperty] = useState("");

  const handleError = () => {
    dispatch(clearErrorAction());
  };

  useEffect(() => {
    // dispatch(getPropertieswoLocksAction());
    dispatch(getAllPropertiesAction());
    dispatch(getUnassignedLocksAction());
  }, []);

  const { locks, error } = useSelector((state: StoreState) => state.lock);
  const properties: Array<PropertyInterface> = useSelector(
    (state: StoreState) => state.property.properties
  );

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
  if (locks !== undefined && locks !== null && locks.length > 0) {
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

  let propertiesWithLocks = [<></>];
  let propertiesWithoutLocks = [<></>];
  if (properties !== undefined && properties !== null) {
    properties.map((property: PropertyInterface, index: number) => {
      if (property.lock) {
        propertiesWithLocks.push(
          <option
            key={index}
            value={property._id}
          >{`${property.title}, ${property.location.addressString1}, ${property.location.city},
        ${property.location.zipcode} ${property.location.country}`}</option>
        );
      } else {
        propertiesWithoutLocks.push(
          <option
            key={index}
            value={property._id}
          >{`${property.title}, ${property.location.addressString1}, ${property.location.city},
          ${property.location.zipcode} ${property.location.country}`}</option>
        );
      }
    });
  }
  const handlePropertyWithLockSelection = (propertyId: string) => {
    setSelectedPropertyWithLock(propertyId);
    const index = properties.findIndex((prop) => prop._id === propertyId);
    setLockOfProperty(properties[index].lock);
  };
  const handleAssign = async () => {
    // check selected properties ?
    if (selectedLock && selectedPropertyWithoutLock) {
      await dispatch(
        assignLockAction(selectedLock, selectedPropertyWithoutLock)
      );
      setSelectedLock("");
      setSelectedPropertyWithoutLock("");
      setLockOfProperty("");
      setSelectedPropertyWithLock("");
    } else {
      dispatch(throwErrorAction("select lock and property"));
    }
  };

  const handleUnassign = async () => {
    if (LockOfProperty && selectedPropertyWithLock) {
      dispatch(unassignLockAction(LockOfProperty));
      setLockOfProperty("");
      setSelectedPropertyWithLock("");
      setSelectedLock("");
      setSelectedPropertyWithoutLock("");
    } else {
      dispatch(throwErrorAction("select lock and property"));
    }
  };
  return (
    <div className={classes.Settings}>
      <h1>Assign / unassign lock to property</h1>
      <div className={classes.Assign}>
        <div className={classes.Properties}>
          <h4>Properties without locks:</h4>
          <select
            defaultValue={selectedPropertyWithoutLock}
            onChange={(e) => setSelectedPropertyWithoutLock(e.target.value)}
          >
            <option value={selectedPropertyWithoutLock} disabled>
              select property
            </option>
            {propertiesWithoutLocks}
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
      <div className={classes.Unassign}>
        <div className={classes.Properties}>
          <h4>Properties with locks:</h4>
          <select
            defaultValue={selectedPropertyWithLock}
            onChange={(e) => handlePropertyWithLockSelection(e.target.value)}
            // onChange={(e) => handleSelection(e.target.value, property.lock)}
          >
            <option value={selectedPropertyWithLock} disabled>
              select property
            </option>
            {propertiesWithLocks}
          </select>
        </div>
        <div className={classes.Locks}>
          <h4>Assigned lock:</h4>
          {LockOfProperty ? LockOfProperty : " --- select property ---"}
        </div>
        <button onClick={handleUnassign}>Unassign</button>
      </div>
    </div>
  );
};

export default Settings;
