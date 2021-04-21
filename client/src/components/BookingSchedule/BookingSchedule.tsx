import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { BsFillHouseDoorFill } from "react-icons/bs";
import Swal from "sweetalert2";

import { cn } from "../../utilities/joinClasses";
import { selectHourAction } from "../../store/actions/bookingActions";
import { SelectionAvailabilty } from "../../store/reducers/bookingReducer";

import classes from "./BookingSchedule.module.scss";

interface scheduleInterface {
  timeZone: string;
  handleBooking: () => void;
}

const BookingSchedule = ({ timeZone, handleBooking }: scheduleInterface) => {
  const booking = useSelector((state: any) => state.booking);
  const dispatch = useDispatch();
  const isAvailabilityChecked = booking.isAvailabilityChecked;
  const startTime = booking.startTime;
  const endTime = booking.endTime;

  useEffect(() => {
    console.log("useffect");
  }, [isAvailabilityChecked]);

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
        <input type="number" name="" id="" defaultValue={1} />
      </div>
      <div className={classes.bookingHours}>
        <button
          onClick={handleBooking}
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
