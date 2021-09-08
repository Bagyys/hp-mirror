import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { StoreState } from '../../store/configureStore';
import { PropertyState } from '../../store/reducers/propertyReducer';
import { ErrorState } from '../../store/reducers/errorReducer';
import {
  getUnassignedLocksAction,
  assignLockAction,
  unassignLockAction,
  selectLockAction,
  clearSelectedLockAction,
} from '../../store/actions/lockActions';
import { throwErrorAction } from '../../store/actions/errorActions';
import { LockProps } from '../../store/types/lockInterfaces';
import {
  getAllPropertiesAction,
  selectPropertyAction,
  clearSelectedPropertyAction,
} from '../../store/actions/propertyActions';
import { clearErrorAction } from '../../store/actions/errorActions';
import { PropertyInterface } from '../../store/types/propertyInterfaces';

import classes from './Settings.module.scss';

const Settings = () => {
  const dispatch = useDispatch();

  const { locks, selectedLock } = useSelector(
    (state: StoreState) => state.lock
  );
  const propertyStore: PropertyState = useSelector(
    (state: StoreState) => state.property
  );
  const properties: Array<PropertyInterface> = propertyStore.properties;
  const selectedProperty: string = propertyStore.selectedProperty;
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  const { searchedDayList, guests } = mainPage;
  const errorState: ErrorState = useSelector(
    (state: StoreState) => state.error
  );
  const { error } = errorState;

  useEffect(() => {
    dispatch(getAllPropertiesAction(searchedDayList, guests));
    dispatch(getUnassignedLocksAction());
  }, []);

  useEffect(() => {}, [locks, properties, selectedLock, selectedProperty]);

  const handleError = () => {
    dispatch(clearErrorAction());
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: error,
        text: 'Please try again',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK',
      }).then(() => {
        handleError();
      });
    }
  }, [error]);

  let lockOptions = null;
  if (locks !== undefined && locks !== null && locks.length > 0) {
    lockOptions = locks.map((lock: LockProps, index: number) => {
      return (
        <option key={lock._id} value={lock._id}>
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
            key={property._id}
            value={property._id}
          >{`${property.title}, ${property.location.addressString1}, ${property.location.city},
        ${property.location.zipcode} ${property.location.country}`}</option>
        );
      } else {
        propertiesWithoutLocks.push(
          <option
            key={property._id}
            value={property._id}
          >{`${property.title}, ${property.location.addressString1}, ${property.location.city},
          ${property.location.zipcode} ${property.location.country}`}</option>
        );
      }
    });
  }
  const selectedPropertyIndex = properties.findIndex(
    (property) => property._id === selectedProperty
  );
  let selectedPropertyLock;
  if (selectedProperty && selectedPropertyIndex >= 0) {
    selectedPropertyLock = properties[selectedPropertyIndex].lock;
  }
  const handlePropertyWithLockSelection = (propertyId: string) => {
    dispatch(selectPropertyAction(propertyId));
    const index = properties.findIndex((prop) => prop._id === propertyId);
    dispatch(selectLockAction(properties[index].lock));
  };

  const handleAssign = async () => {
    if (selectedLock && selectedProperty) {
      await dispatch(assignLockAction(selectedLock, selectedProperty));
      dispatch(clearSelectedPropertyAction());
      dispatch(clearSelectedLockAction());
    } else {
      dispatch(throwErrorAction('select lock and property'));
    }
  };

  const handleUnassign = async () => {
    if (selectedLock && selectedProperty) {
      await dispatch(unassignLockAction(selectedLock));
      dispatch(clearSelectedPropertyAction());
      dispatch(clearSelectedLockAction());
    } else {
      dispatch(throwErrorAction('select lock and property'));
    }
  };
  return (
    <div className={classes.Settings}>
      <h1>Assign / unassign lock to property</h1>
      <div className={classes.Assign}>
        <div className={classes.Properties}>
          <h4>Properties without locks:</h4>
          <select
            defaultValue={selectedProperty}
            onChange={(e) => dispatch(selectPropertyAction(e.target.value))}
          >
            <option value={selectedProperty} disabled={!selectedProperty}>
              select property
            </option>
            {propertiesWithoutLocks}
          </select>
        </div>
        <div className={classes.Locks}>
          <h4>Available locks:</h4>
          <select
            defaultValue={selectedLock}
            onChange={(e) => dispatch(selectLockAction(e.target.value))}
          >
            <option value={selectedLock} disabled={!selectedLock}>
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
            defaultValue={selectedProperty}
            onChange={(e) => handlePropertyWithLockSelection(e.target.value)}
          >
            <option value={selectedProperty} disabled={!selectedProperty}>
              select property
            </option>
            {propertiesWithLocks}
          </select>
        </div>
        <div className={classes.Locks}>
          <h4>Assigned lock:</h4>
          {selectedPropertyLock
            ? selectedPropertyLock
            : ' --- select property ---'}
        </div>
        <button onClick={handleUnassign}>Unassign</button>
      </div>
    </div>
  );
};

export default Settings;
