import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";

import { StoreState } from "../../store/configureStore";
import { reservationState } from "../../store/reducers/reservationReducer";
import {
  selectReservationAction,
  unselectReservationAction,
} from "../../store/actions/reservationActions";
import { ReservationInterface } from "../../store/types/reservationInterfaces";

import classes from "./PastReservation.module.scss";

interface Props {
  reservation: ReservationInterface;
  visible: boolean;
  changeVisibility: () => void;
}

const PastReservation: React.FC<Props> = ({
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
    disableButtons = lock.o1 === 1 || lock.o2 === 1;
  }
  const startMoment = moment
    .tz(reservation.startDate, reservation.timeZone)
    .toDate();
  const start = moment(startMoment).format("YYYY-MM-DD HH:mm");
  const endMoment = moment
    .tz(reservation.endDate, reservation.timeZone)
    .toDate();
  const end = moment(endMoment).format("YYYY-MM-DD HH:mm");

  return (
    <div className={classes.PastReservation}>
      <div className={classes.Preview} onClick={handleClick}>
        <h3>Reservation at: {reservation.property.title}</h3>
        <p>
          Start: {start} | End: {end}
        </p>
      </div>
      <hr />
      {visible && (
        <>
          <div className={classes.FullView}>
            kazkas dar bus cia
            {/* <button
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
            </button> */}
          </div>
          <hr />
        </>
      )}
    </div>
  );
};
export default PastReservation;
