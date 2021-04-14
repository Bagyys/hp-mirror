import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { BsFillHouseDoorFill } from "react-icons/bs";

import { cn } from "../../utilities/joinClasses";
import { bookHours, removeHours } from "../../store/actions/bookingActions";
import { DisplayDay } from "../../routes/FlatReview/FlatView";
import classes from "./BookingSchedule.module.scss";

interface scheduleInterface {
  displayDates: Array<DisplayDay>;
  occupiedTime: any;
}

const BookingSchedule = ({ displayDates, occupiedTime }: scheduleInterface) => {
  console.log("BookingSchedule");
  console.log("occupiedTime");
  console.log(occupiedTime);
  console.log("displayDates");
  console.log(displayDates);
  const booking = useSelector((state: any) => state.booking);
  const dispatch = useDispatch();
  const startDate = moment(displayDates[0].day).format("dddd MMM Do");
  const tableHours = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];
  const hourStatus = (index: number, dispHour: string): boolean => {
    console.log("hourStatus");
    // console.log("displayDates[index]");
    // console.log(displayDates[index]);
    const occIndex = displayDates[index].occIndex;
    // console.log("occIndex");
    // console.log(occIndex);
    if (occIndex !== undefined) {
      const occupiedHours = occupiedTime[occIndex].rentedHours;
      // console.log("occupiedHours");
      // console.log(occupiedHours);
      occupiedHours.forEach(({ hour }: { hour: Date }) => {
        // netinka ciklas cia!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // console.log("dispHour");
        // console.log(dispHour);
        const hourNumber = new Date(hour).getHours();
        const hourString =
          hourNumber < 10 ? "0" + hourNumber + ":00" : hourNumber + ":00";
        // console.log("dispHour === hourString");
        console.log(dispHour);
        console.log(dispHour === hourString);
        if (dispHour === hourString) return false;
      });
    }
    console.log(dispHour);
    console.log(true);
    return true;
  };

  const table = displayDates.map((displayDate, dateIndex) => {
    return (
      <div className={classes.dayColumn} key={dateIndex}>
        {tableHours.map((hour, hourIndex) => {
          return (
            <div
              className={`${classes.hourRow} ${
                // !displayDate.occupied
                //   ? classes.available
                //   : hourStatus(dateIndex, hour)
                //   ? classes.available
                //   : classes.unavailable
                hourStatus(dateIndex, hour)
                  ? classes.available
                  : classes.unavailable
              }`}
              key={hourIndex}
            >
              {hour}
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div className={classes.BookingSchedule}>
      <div className={classes.HourlyTable}>{table}</div>
      <div className={classes.bookingHours}>
        <button>Book Hours</button>
      </div>
    </div>
  );
};
export default BookingSchedule;
