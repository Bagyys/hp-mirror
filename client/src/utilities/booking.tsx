import moment from "moment-timezone";

import { SelectionAvailabilty } from "../store/reducers/bookingReducer";
import { OccupiedDayInterface } from "../store/types/propertyInterfaces";

export const indexInArray = (
  array: Array<OccupiedDayInterface>,
  value: Date
): number => {
  return array.findIndex((item) => {
    return (
      item.isRented &&
      moment(value).format("YYYY-MM-DD") ===
        moment(item.dateString).format("YYYY-MM-DD")
    );
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
