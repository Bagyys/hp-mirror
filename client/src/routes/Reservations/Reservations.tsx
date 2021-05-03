import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { StoreState } from "../../store/configureStore";
import { userState } from "../../store/reducers/userReducer";
import { getUserReservationsAction } from "../../store/actions/userActions";
import { ReservationInterface } from "../../store/types/reservationInterfaces";

import classes from "./Reservations.module.scss";

const Reservations = () => {
  const dispatch = useDispatch();
  const user: userState = useSelector((state: StoreState) => state.user);

  useEffect(() => {
    if (user._id) {
      dispatch(getUserReservationsAction(user._id));
    }
  }, []);

  const reservations: Array<ReservationInterface> = useSelector(
    (state: StoreState) => state.user.activeReservations
  );
  //   console.log("reservations");
  //   console.log(reservations);
  let reservationsRender = null;
  if (reservations.length > 0) {
    reservationsRender = reservations.map((reservation) => {
      return (
        <>
          <div key={reservation._id}>
            <h3>Reservation at: {reservation.property.title}</h3>
            <p>Number of residents: {reservation.residents}</p>
            <p>Price: {reservation.price}</p>
            <p>Start: {reservation.startDate}</p>
            <p>End: {reservation.endDate}</p>
          </div>
        </>
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
