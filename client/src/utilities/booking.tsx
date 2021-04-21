import moment from "moment-timezone";
import { SelectionAvailabilty } from "../store/reducers/bookingReducer";
import { OccupiedDay } from "../store/reducers/propertyReducer";

export const indexInArray = (
  array: Array<OccupiedDay>,
  value: Date
): number => {
  // TODO add typescript interface for array
  return array.findIndex((item) => {
    return (
      item.isRented &&
      moment(value).format("YYYY-MM-DD") ===
        moment(item.dateString).format("YYYY-MM-DD")
      // moment(moment(item.date).startOf("day").toDate()).isSame(value)
      // new Date(item.date).getFullYear() === value.getFullYear() &&
      // new Date(item.date).getMonth() === value.getMonth() &&
      // new Date(item.date).getDate() === value.getDate()
    );
    // return item.isRented && new Date(item.date).getTime() === value.getTime();
  });
};

export const indexInDisplayArray = (
  array: Array<SelectionAvailabilty>,
  value: string
): number => {
  return array.findIndex((item) => {
    return item.date === value;
  });
};

export const formAvailableDayHours = () => {
  let availableHours = {};
  for (let i = 0; i < 24; i++) {
    const hour = { [i]: "available" };
    availableHours = { ...availableHours, ...hour };
  }
  return availableHours;
};

export const formOccupiedDayHours = (rentedHours: {
  [key: number]: boolean;
}) => {
  let occupiedHours = {};
  for (let i = 0; i < 24; i++) {
    let hour = {};
    rentedHours[i]
      ? (hour = { [i]: "unavailable" })
      : (hour = { [i]: "available" });
    occupiedHours = { ...occupiedHours, ...hour };
  }
  return occupiedHours;
};

export const unselectDayHours = (hours: { [key: number]: string }) => {
  Object.entries(hours).forEach(([key, value]) => {
    if (value === "selected") {
      hours[+key] = "available";
    }
  });
  return hours;
};
