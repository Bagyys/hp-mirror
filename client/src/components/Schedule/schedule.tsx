import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { BsFillHouseDoorFill } from "react-icons/bs";

import { bookHours, removeHours } from "../../store/actions/bookingActions";
import { DisplayDay } from "../../routes/FlatReview/FlatView";
import classes from "./schedule.module.scss";

interface scheduleInterface {
  displayDates: Array<DisplayDay>;
  occupiedTime: any;
}

const Schedule = ({ displayDates, occupiedTime }: scheduleInterface) => {
  console.log("Schedule");
  console.log("occupiedTime");
  console.log(occupiedTime);
  console.log("displayDates");
  console.log(displayDates);
  const booking = useSelector((state: any) => state.booking);
  const dispatch = useDispatch();
  // if (displayDates) {
  const startDate = moment(displayDates[0].day).format("dddd MMM Do");
  // }
  // const todaysDate = moment(date).format("dddd MMM Do");
  // const lastDay = moment(endDate).format("dddd MMM Do");
  // const [removalArray, setRemovalArray] = useState<Array<Date>>([]);
  // const startOFF = new Date(date);
  // const startOFFendDate = new Date(endDate);
  // let i;
  // let occupationArray: any = [];
  // let occupationEndArray: any = [];
  // occupiedTime.map((item: any, index: any) => {
  //   const currentDate = new Date(startOFF.setHours(0, 0, 0));
  //   const endCurrentDate = new Date(startOFFendDate.setHours(0, 0, 0, 0));

  //   if (currentDate.getTime() === item.date.getTime()) {
  //     for (i = 0; i < 24; i++) {
  //       const tableTime = new Date(startOFF.setHours(i, 0, 0));
  //       const tableTimeEndData = new Date(startOFFendDate.setHours(i, 0, 0));
  //       const isOccupiedOrNot = item.rentedHours.some(
  //         (hours: any) => tableTime.getTime() === hours.getTime()
  //       );
  //       const timeObject = {
  //         isOccupiedOrNot,
  //         tableTime,
  //         tableTimeEndData,
  //         isAllDayBooked: item.isWholeDayRented,
  //       };

  //       occupationArray.push(timeObject);
  //     }
  //   } else if (endCurrentDate.getTime() === item.date.getTime()) {
  //     for (i = 0; i < 24; i++) {
  //       const tableTimeEndData = new Date(startOFFendDate.setHours(i, 0, 0));
  //       const isOccupiedOrNot = item.rentedHours.some(
  //         (hours: any) => tableTimeEndData.getTime() === hours.getTime()
  //       );
  //       const timeObject = {
  //         isOccupiedOrNot,
  //         tableTimeEndData,
  //         isAllDayBooked: item.isWholeDayRented,
  //       };

  //       occupationEndArray.push(timeObject);
  //     }
  //   }
  // });

  // let bookingHoursInState = booking.hoursForBooking;
  // const allHoursFree: any = [];
  // for (i = 0; i < 24; i++) {
  //   const tableTime = new Date(startOFF.setHours(i, 0, 0));
  //   let isAlreadyTaken = bookingHoursInState.some(
  //     (timeTaken: Date) => tableTime.getTime() === timeTaken.getTime()
  //   );
  //   const freeHour = (
  //     <div className={isAlreadyTaken ? classes.disabled : ""}>
  //       <span>
  //         <BsFillHouseDoorFill
  //           size="2em"
  //           color="4886ff"
  //           onClick={() => addToList(tableTime)}
  //           style={{ cursor: "pointer" }}
  //         />
  //         <span className={classes.tooltipText}>
  //           Apartment is available on this time
  //         </span>
  //       </span>
  //     </div>
  //   );
  //   allHoursFree.push(freeHour);
  // }
  // useEffect(() => {
  //   setRemovalArray(bookingHoursInState);
  // }, [bookingHoursInState]);
  // bookingHoursInState.sort(function (a: any, b: any) {
  //   var dateA: any = new Date(a);
  //   var dateB: any = new Date(b);
  //   return dateA - dateB;
  // });
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
  // const addToList = (hour: Date) => {
  //   dispatch(bookHours(hour));
  // };
  // const deleteHour = (hour: Date) => {
  //   const index = removalArray.indexOf(hour);
  //   if (index > -1) {
  //     removalArray.splice(index, 1);
  //   }
  //   dispatch(removeHours(removalArray));
  // };

  return (
    <div className={classes.Schedule}>
      <div className={classes.HourlyTable}>
        <h2 className={classes.HourlyTitle}>
          This is hourly schedule for {startDate}
        </h2>
        <div className={classes.tableContent}>
          <div className={classes.TimeColumn}>
            {tableHours.map((hour, index) => {
              return <div key={index}>{hour}</div>;
            })}
          </div>

          <div className={classes.Column}>
            {/* {occupationArray.length === 0
              ? allHoursFree.map((item: any) => {
                  return item;
                })
              : occupationArray.map((item: any, index: any) => {
                  if (item.isAllDayBooked) {
                    return (
                      <div key={index}>
                        <span>
                          <BsFillHouseDoorFill size="2em" color="red" />
                          <span className={classes.tooltipText}>
                            Apartment is not available on this time
                          </span>
                        </span>
                      </div>
                    );
                  } else {
                    if (item.isOccupiedOrNot) {
                      return (
                        <div key={index}>
                          <span>
                            <BsFillHouseDoorFill size="2em" color="red" />
                            <span className={classes.tooltipText}>
                              Apartment is not available on this time
                            </span>
                          </span>
                        </div>
                      );
                    } else {
                      let isAlreadyTaken = bookingHoursInState.some(
                        (timeTaken: Date) =>
                          item.tableTime.getTime() === timeTaken.getTime()
                      );
                      return (
                        <div className={isAlreadyTaken ? classes.disabled : ""}>
                          <span>
                            <BsFillHouseDoorFill
                              size="2em"
                              color="4886ff"
                              onClick={() => addToList(item.tableTime)}
                              style={{ cursor: "pointer" }}
                            />
                            <span className={classes.tooltipText}>
                              Apartment is available on this time
                            </span>
                          </span>
                        </div>
                      );
                    }
                  }
                })} */}
          </div>
          <div className={classes.bookingHours}>
            <h2>Selected hours for booking :</h2>
            <ul>
              {/* {bookingHoursInState.map((hour: Date, index: string) => {
                return (
                  <li key={index}>
                    {moment(hour).format()}
                    <button onClick={() => deleteHour(hour)}>X</button>
                  </li>
                );
              })} */}
            </ul>
            <button>Book Hours</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Schedule;
