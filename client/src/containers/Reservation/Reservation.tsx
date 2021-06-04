import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";
import Swal from "sweetalert2";

import { StoreState } from "../../store/configureStore";
import { reservationState } from "../../store/reducers/reservationReducer";
import { ErrorState } from "../../store/reducers/errorReducer";
import {
  selectReservationAction,
  unselectReservationAction,
  openCurrentLockAction,
  cancelUserReservationAction,
} from "../../store/actions/reservationActions";
import { clearErrorAction } from "../../store/actions/errorActions";
import { ReservationInterface } from "../../store/types/reservationInterfaces";

import classes from "./Reservation.module.scss";
import { useEffect } from "react";

interface Props {
  reservation: ReservationInterface;
  visible: boolean;
  disabled: boolean;
  changeVisibility: () => void;
}

const Reservation: React.FC<Props> = ({
  reservation,
  visible,
  disabled,
  changeVisibility,
}) => {
  const dispatch = useDispatch();
  const reservationsState: reservationState = useSelector(
    (state: StoreState) => state.reservation
  );
  const currentReservation = reservationsState.currentReservation;
  const lock = currentReservation ? currentReservation.lock : null;

  const errorState: ErrorState = useSelector(
    (state: StoreState) => state.error
  );
  const { error } = errorState;

  const handleError = () => {
    dispatch(clearErrorAction());
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: error,
        text: "Please try again",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      }).then(() => {
        handleError();
      });
    }
  }, [error]);

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

  let disableButtons = true;
  
  if (lock && disabled !== undefined) {
    disableButtons = lock.o1 === 1 || lock.o2 === 1 || disabled;
  }
  const startMoment = moment.tz(reservation.startDate, reservation.timeZone);
  const start = moment(startMoment).format("YYYY-MM-DD HH:mm");
  const endMoment = moment.tz(reservation.endDate, reservation.timeZone);
  const end = moment(endMoment).format("YYYY-MM-DD HH:mm");

  return (
    <div className={classes.Reservation}>
      <div className={classes.Preview} onClick={handleClick}>
        <h3>Reservation at: {reservation.property.title}</h3>
        <p>
          Start: {start} | End: {end} (time:{" "}
          {reservation.property.location.timeZone})
        </p>
      </div>
      <hr />

      {visible && (
        <>
          <button
            className={classes.Cancel}
            onClick={() =>
              dispatch(
                cancelUserReservationAction(
                  reservation._id,
                  reservation.propertyId,
                  reservation.userId
                )
              )
            }
          >
            Cancel reservation
          </button>
          <div className={classes.FullView}>
            <button
              className={classes.Open}
              disabled={disableButtons}
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
              className={classes.Open}
              disabled={disableButtons}
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
