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
  changeVisibility: () => void;
}

const Reservation: React.FC<Props> = ({
  reservation,
  visible,
  changeVisibility,
}) => {
  const dispatch = useDispatch();
  const reservationsState: reservationState = useSelector(
    (state: StoreState) => state.reservation
  );
  const currentReservation = reservationsState.currentReservation;

  const lock = currentReservation ? currentReservation.lock : null;

  console.log("lock");
  console.log(lock);

  useEffect(() => {
    console.log("Reservation useEffect socketui");
    socket.on("lockUpdate", (data) => {
      console.log("data");
      console.log(data);
      const { id, o1, o2, o3 } = data;
      console.log("lock !== null");
      console.log(lock !== null);
      console.log("lock !== undefined");
      console.log(lock !== undefined);
      console.log("id === lock._id");
      console.log(id === lock?._id);
      if (lock !== null && lock !== undefined && id === lock._id) {
        console.log(true);
        dispatch(updateCurrentLockAction(o1, o2, o3));
      }
    });
  }, []);

  // const [visible, setVisible] = useState<boolean>(false);

  const handleClick = () => {
    if (visible) {
      changeVisibility();
      // setVisible(false);
      dispatch(unselectReservationAction());
    } else {
      changeVisibility();
      // setVisible(true);
      dispatch(
        selectReservationAction(reservation._id, reservation.propertyId)
      );
    }
  };
  let disableButtons = false;
  if (lock) {
    disableButtons = lock.o1 === 1 || lock.o2 === 1 ? true : false;
  }

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
              disabled={disableButtons}
              onClick={() =>
                dispatch(openCurrentLockAction(reservation.property.lock, "o1"))
              }
            >
              Open front lock
            </button>
            <button
              disabled={disableButtons}
              onClick={() =>
                dispatch(openCurrentLockAction(reservation.property.lock, "o2"))
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
