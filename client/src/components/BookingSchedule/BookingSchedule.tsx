import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { BsFillHouseDoorFill } from "react-icons/bs";
import Swal from "sweetalert2";

import { cn } from "../../utilities/joinClasses";
import { selectHourAction } from "../../store/actions/bookingActions";
import { SelectionAvailabilty } from "../../store/reducers/bookingReducer";
import { OccupiedDay } from "../../store/reducers/propertyReducer";
import { DisplayDay } from "../../routes/FlatReview/FlatView";
import classes from "./BookingSchedule.module.scss";

interface scheduleInterface {
  displayDates: Array<DisplayDay>;
  occupiedTime: Array<OccupiedDay>;
  timeZone: string;
}

const BookingSchedule = ({
  displayDates,
  occupiedTime,
  timeZone,
}: scheduleInterface) => {
  // console.log("BookingSchedule");
  // console.log("occupiedTime");
  // console.log(occupiedTime);
  // console.log("displayDates");
  // console.log(displayDates);
  const booking = useSelector((state: any) => state.booking);
  const dispatch = useDispatch();
  // const startDate = moment(displayDates[0].day).format("dddd MMM Do");
  const isAvailabilityChecked = booking.isAvailabilityChecked;
  const startTime = booking.startTime;
  const endTime = booking.endTime;

  useEffect(() => {
    console.log("useffect");
  }, [isAvailabilityChecked]);
  const displaySchedule: Array<SelectionAvailabilty> = booking.displayDays;
  // console.log("displaySchedule");
  // console.log(displaySchedule);
  console.log("timeZone");
  console.log(timeZone);
  let newTable = [<></>];
  if (isAvailabilityChecked) {
    newTable = displaySchedule.map((oneDate, dateIndex) => {
      // console.log("62 oneDate");
      // console.log(oneDate);
      // console.log("oneDate.date");
      // console.log(oneDate.date);
      // console.log("Object.keys(oneDate.hours)");
      // console.log(Object.keys(oneDate.hours));
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
      <div className={classes.bookingHours}>
        <button onClick={() => {}}>Book Hours</button>
      </div>
    </div>
  );
};
export default BookingSchedule;
