import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../utilities/socketConnection";

import { StoreState } from "../../store/configureStore";
import { reservationState } from "../../store/reducers/reservationReducer";
import {
  selectReservationAction,
  unselectReservationAction,
  openCurrentLockAction,
  updateCurrentLockAction,
} from "../../store/actions/reservationActions";
import { ReservationInterface } from "../../store/types/reservationInterfaces";

import classes from "./Reservation.module.scss";

interface Props {
  reservation: ReservationInterface;
  visible: boolean;
  clickable: boolean;
  changeVisibility: () => void;
}

const Reservation: React.FC<Props> = ({
  reservation,
  visible,
  clickable,
  changeVisibility,
}) => {
  console.log("clickable");
  console.log(clickable);

  const dispatch = useDispatch();
  const reservationsState: reservationState = useSelector(
    (state: StoreState) => state.reservation
  );
  const currentReservation = reservationsState.currentReservation;

  const lock = currentReservation ? currentReservation.lock : null;

  useEffect(() => {
    socket.on("lockUpdate", (data) => {
      const { id, o1, o2, o3 } = data;
      if (lock !== null && lock !== undefined && id === lock._id) {
        dispatch(updateCurrentLockAction(o1, o2, o3));
      }
    });
  }, []);

  // TODO: check door disabling - not fully working

  const handleClick = () => {
    if (visible) {
      changeVisibility();
      dispatch(unselectReservationAction());
    } else {
      changeVisibility();
      dispatch(
        selectReservationAction(reservation._id, reservation.propertyId)
      );
    }
  };
  let disableButtons = false;
  if (lock) {
    disableButtons = lock.o1 === 1 || lock.o2 === 1 ? true : false;
  }
  console.log("disableButtons && clickable");
  console.log(disableButtons && clickable);
  return (
    <div className={classes.Reservation}>
      <div className={classes.Preview} onClick={handleClick}>
        <h3>Reservation at: {reservation.property.title}</h3>
        <p>Start: {reservation.startDate}</p>
      </div>
      <hr />
      {visible && (
        <>
          <div className={classes.FullView}>
            <button
              disabled={disableButtons && !clickable}
              onClick={() =>
                dispatch(
                  openCurrentLockAction(
                    reservation.property.lock,
                    reservation._id,
                    "o1"
                  )
                )
              }
            >
              Open front lock
            </button>
            <button
              disabled={disableButtons && !clickable}
              onClick={() =>
                dispatch(
                  openCurrentLockAction(
                    reservation.property.lock,
                    reservation._id,
                    "o2"
                  )
                )
              }
            >
              Open flat lock
            </button>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};
export default Reservation;
