import { fchmod } from "fs";
import React, { FC, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ReservNights {}

const ReserveNightsForm: FC<ReservNights> = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndtDate] = useState(new Date());

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date: any) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={(date: any) => setEndtDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </>
  );
};
export default ReserveNightsForm;
