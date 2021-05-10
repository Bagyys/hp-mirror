import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { StoreState } from "../../store/configureStore";
import { userState } from "../../store/reducers/userReducer";
import {
  loadUser,
  getUserReservationsAction,
} from "../../store/actions/userActions";
import { ReservationInterface } from "../../store/types/reservationInterfaces";

import classes from "./Reservations.module.scss";

const Reservations = () => {
  const dispatch = useDispatch();
  const userState: userState = useSelector((state: StoreState) => state.user);
  const user = userState.user;
  useEffect(() => {
    console.log("useEffect 1 user");
    console.log(user);
    if (user && user._id) {
      console.log(true);
      dispatch(getUserReservationsAction(user._id));
    } else {
      dispatch(loadUser());
    }
  }, []);

  const reservations: Array<ReservationInterface> = user.activeReservations;
  let reservationsRender = null;
  if (reservations.length > 0 && typeof reservations[0] !== "string") {
    reservationsRender = reservations.map((reservation) => {
      return (
        // <>
        <div key={reservation._id}>
          <h3>Reservation at: {reservation.property.title}</h3>
          <p>Number of residents: {reservation.residents}</p>
          <p>Price: {reservation.price}</p>
          <p>Start: {reservation.startDate}</p>
          <p>End: {reservation.endDate}</p>
        </div>
        // </>
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
