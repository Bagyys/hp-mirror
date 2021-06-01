import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import socket from "../../utilities/socketConnection";
import Swal from "sweetalert2";

import { StoreState } from "../../store/configureStore";
import { userState } from "../../store/reducers/userReducer";
import { reservationState } from "../../store/reducers/reservationReducer";
import {
  getActiveReservationsAction,
  updateCurrentLockAction,
  clearErrorAction,
} from "../../store/actions/reservationActions";

import Reservation from "../../containers/Reservation/Reservation";

import classes from "./Reservations.module.scss";

const Reservations = () => {
  const dispatch = useDispatch();
  const userState: userState = useSelector((state: StoreState) => state.user);
  const user = userState.user;

  const reservationsState: reservationState = useSelector(
    (state: StoreState) => state.reservation
  );
  const currentReservation = reservationsState.currentReservation;
  const reservations = reservationsState.isFetched
    ? reservationsState.activeReservations
    : [];
  const currentLockId = currentReservation?.lock?._id;
  const error = reservationsState.error;

  // getting user's active reservations from database
  useEffect(() => {
    if (user && user._id) {
      dispatch(getActiveReservationsAction(user._id));
    }
  }, []);

  // updating locks with socket io if they're updated in database
  useEffect(() => {
    socket.on("lockUpdate", (data) => {
      const { id, o1, o2, o3 } = data;
      if (currentLockId !== undefined && id === currentLockId) {
        dispatch(updateCurrentLockAction(o1, o2, o3));
      }
    });
  }, [currentReservation]);

  // error handling
  const handleError = () => {
    dispatch(clearErrorAction());
  };
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

  // states for active reservations' displaying and button disabling

  const initialVisibleArray = Array.from(
    { length: reservations.length },
    (i) => (i = false)
  );

  const initialDisabledLocksArray = Array.from(reservations, (reservation) => {
    const now = moment.utc(new Date()).toDate();
    return !(
      moment(moment.utc(reservation.startDate)).isBefore(moment.utc(now)) &&
      moment(moment.utc(now)).isBefore(moment.utc(reservation.endDate))
    );
  });

  const [isReservationVisible, setReservationVisibility] = useState<boolean[]>(
    Array.from({ length: reservations.length }, (i) => (i = false))
  );

  const [areLocksDisabled, setLocksDisabled] = useState<boolean[]>(
    Array.from({ length: reservations.length }, (i) => (i = true))
  );
  console.log("areLocksDisabled");
  console.log(areLocksDisabled);
  const changeVisibility = (changeIndex: number) => {
    const newArr = isReservationVisible.map((value, index) => {
      if (index === changeIndex) {
        return value ? false : true;
      } else return false;
    });
    setReservationVisibility(newArr);
  };

  useEffect(() => {
    if (reservations.length) {
      setReservationVisibility(initialVisibleArray);
      setLocksDisabled(initialDisabledLocksArray);
    }
  }, [reservations]);

  // rendering Reservation components
  let reservationsRender = null;
  if (reservations.length > 0) {
    reservationsRender = reservations.map((reservation, index) => {
      return (
        <Reservation
          key={reservation._id}
          reservation={reservation}
          visible={isReservationVisible[index]}
          disabled={areLocksDisabled[index]}
          changeVisibility={() => {
            changeVisibility(index);
          }}
        />
      );
    });
  } else {
    reservationsRender = (
      <>
        <h3>There are no reservations</h3>
      </>
    );
  }

  return (
    <div className={classes.Reservations}>
      <h1>Upcoming reservations</h1>
      {reservationsRender}
    </div>
  );
};

export default Reservations;
