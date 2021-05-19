import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { StoreState } from "../../store/configureStore";
import { userState } from "../../store/reducers/userReducer";
import { loadUser } from "../../store/actions/userActions";
import { getActiveReservationsAction } from "../../store/actions/reservationActions";

import Reservation from "../../containers/Reservation/Reservation";

import classes from "./Reservations.module.scss";

const Reservations = () => {
  const dispatch = useDispatch();
  const userState: userState = useSelector((state: StoreState) => state.user);
  const reservationsState = useSelector(
    (state: StoreState) => state.reservation
  );
  const user = userState.user;
  useEffect(() => {
    if (user && user._id) {
      dispatch(getActiveReservationsAction(user._id));
    } else {
      dispatch(loadUser());
    }
  }, []);

  const reservations = reservationsState.isFetched
    ? reservationsState.activeReservations
    : [];
  let reservationsRender = null;
  if (reservations.length > 0) {
    reservationsRender = reservations.map((reservation) => {
      return <Reservation key={reservation._id} reservation={reservation} />;
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
