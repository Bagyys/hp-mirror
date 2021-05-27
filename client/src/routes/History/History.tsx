import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import socket from "../../utilities/socketConnection";
import Swal from "sweetalert2";

import { StoreState } from "../../store/configureStore";
import { userState } from "../../store/reducers/userReducer";
import { reservationState } from "../../store/reducers/reservationReducer";
import {
  getPastReservationsAction,
  clearErrorAction,
} from "../../store/actions/reservationActions";

import PastReservation from "../../containers/PastReservation/PastReservation";

import classes from "./History.module.scss";

const History = () => {
  const dispatch = useDispatch();
  const userState: userState = useSelector((state: StoreState) => state.user);
  const user = userState.user;

  const reservationsState: reservationState = useSelector(
    (state: StoreState) => state.reservation
  );
  const reservations = reservationsState.isFetched
    ? reservationsState.pastReservations
    : [];
  const error = reservationsState.error;

  // getting user's active reservations from database
  useEffect(() => {
    if (user && user._id) {
      dispatch(getPastReservationsAction(user._id));
    }
  }, []);

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

  const [isReservationVisible, setReservationVisibility] = useState<boolean[]>(
    Array.from({ length: reservations.length }, (i) => (i = false))
  );

  const changeVisibility = (changeIndex: number) => {
    const newArr = isReservationVisible.map((value, index) => {
      if (index === changeIndex) {
        return value ? false : true;
      } else return false;
    });
    setReservationVisibility(newArr);
  };

  //
  useEffect(() => {
    if (reservations.length) {
      setReservationVisibility(initialVisibleArray);
    }
  }, [reservations]);

  // rendering Reservation components
  let reservationsRender = null;
  if (reservations.length > 0) {
    reservationsRender = reservations.map((reservation, index) => {
      return (
        <PastReservation
          key={reservation._id}
          reservation={reservation}
          visible={isReservationVisible[index]}
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
    <div className={classes.History}>
      <h1>Past reservations</h1>
      {reservationsRender}
    </div>
  );
};

export default History;
