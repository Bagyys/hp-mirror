import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../utilities/socketConnection";

import { StoreState } from "../../store/configureStore";
import {
  selectReservationAction,
  updateCurrentLockAction,
} from "../../store/actions/reservationActions";
import { ReservationInterface } from "../../store/types/reservationInterfaces";

import classes from "./Reservation.module.scss";

interface Props {
  reservation: ReservationInterface;
}

const Reservation: React.FC<Props> = ({ reservation }) => {
  const dispatch = useDispatch();
  const currentReservation = useSelector(
    (state: StoreState) => state.reservation.currentReservation
  );
  const lock = currentReservation ? currentReservation.lock : null;
  useEffect(() => {
    socket.on("lockUpdate", (data) => {
      const { id, o1, o2, o3 } = data;
      if (id === lock?._id) {
        dispatch(updateCurrentLockAction(o1, o2, o3));
      }
    });
  }, []);

  const [visible, setVisible] = useState<boolean>(false);

  const handleClick = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
      dispatch(selectReservationAction(reservation.propertyId));
    }
  };

  const disableButtons = false;

  const handleDoor = (lockId: string, door: string) => {
    console.log("Reservation handleDoor gavau propsus");
    console.log(lockId);
    console.log(door);
  };

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
              onClick={() => handleDoor(reservation.property.lock, "o1")}
            >
              Open front lock
            </button>
            <button
              disabled={disableButtons}
              onClick={() => handleDoor(reservation.property.lock, "o2")}
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
