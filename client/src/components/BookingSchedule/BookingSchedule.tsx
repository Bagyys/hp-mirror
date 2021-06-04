import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { StoreState } from "../../store/configureStore";
import { SelectionAvailabilty } from "../../store/reducers/bookingReducer";
import { ErrorState } from "../../store/reducers/errorReducer";
import { cn } from "../../utilities/joinClasses";
import { selectHourAction } from "../../store/actions/bookingActions";
import { clearErrorAction } from "../../store/actions/errorActions";

import classes from "./BookingSchedule.module.scss";

interface scheduleInterface {
  timeZone: string;
  handleBooking: (residents: number) => void;
}

const BookingSchedule = ({ timeZone, handleBooking }: scheduleInterface) => {
  const dispatch = useDispatch();
  const booking = useSelector((state: StoreState) => state.booking);
  const isAvailabilityChecked = booking.isAvailabilityChecked;
  const startTime = booking.startTime;
  const endTime = booking.endTime;

  const errorState: ErrorState = useSelector(
    (state: StoreState) => state.error
  );
  const { error } = errorState;

  const [residents, setResidents] = useState<number>(1);

  useEffect(() => {}, [isAvailabilityChecked]);

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

  const displaySchedule: Array<SelectionAvailabilty> = booking.displayDays;

  let newTable = [<></>];
  if (isAvailabilityChecked) {
    newTable = displaySchedule.map((oneDate, dateIndex) => {
      return (
        <div
          className={classes.dayColumn}
          key={new Date(oneDate.date).getTime()}
        >
          <p>{oneDate.date}</p>
          {Object.keys(oneDate.hours).map((hour, hourIndex) => {
            return (
              <div
                className={cn(
                  classes.hourRow,
                  classes[oneDate.hours[hourIndex]]
                )}
                key={hourIndex + 1000}
                onClick={() => {
                  if (oneDate.hours[hourIndex] !== "unavailable") {
                    const date = {
                      hour: +hour,
                      day: oneDate.date,
                      dayIndex: dateIndex,
                      timeZone,
                    };
                    dispatch(
                      selectHourAction(
                        date,
                        startTime,
                        endTime,
                        displaySchedule
                      )
                    );
                  } else {
                    Swal.fire("This time is unavailable");
                  }
                }}
              >
                {hourIndex < 10 ? `0${hour}:00` : `${hour}:00`}
              </div>
            );
          })}
        </div>
      );
    });
  }

  return (
    <div className={classes.BookingSchedule}>
      <div className={classes.HourlyTable}>
        {isAvailabilityChecked && newTable}
      </div>
      <div className={classes.ResidentsInput}>
        <label htmlFor="">How many people will be staying? </label>
        <input
          type="number"
          name=""
          id=""
          defaultValue={1}
          onChange={(event) => setResidents(+event.target.value)}
        />
      </div>
      <div className={classes.bookButton}>
        <button
          onClick={() => handleBooking(residents)}
          disabled={
            booking.startTime === undefined && booking.endTime === undefined
          }
        >
          Book Hours
        </button>
      </div>
    </div>
  );
};
export default BookingSchedule;
