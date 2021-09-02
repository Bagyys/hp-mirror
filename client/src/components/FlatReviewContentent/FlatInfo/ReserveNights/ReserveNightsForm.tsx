import { fchmod } from "fs";
import React, { FC, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import "@material-ui/pickers";
import { TextField, Select } from "@material-ui/core";
import classes from "./reserveNightsForm.module.scss";

interface ReservNights {}

const ReserveNightsForm: FC<ReservNights> = (): any => {
  const [startDate, setStartDate] = useState(new Date());
  const handleDateChange = (date: any) => {
    setStartDate(date);
  };
  const [endDate, setEndtDate] = useState(new Date());

  return (
    <>
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker"
          label="Check In"
          value={startDate}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider> */}
      {/* <DatePicker
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
      /> */}
      <div className={classes.Selection}>
        <form className={classes.Form}>
          <TextField
            id="date"
            label="Check In"
            type="date"
            defaultValue="2021-09-02"
            classes={{
              root: classes.TextField,
              // FormLabel: classes.text,
              // label: classes.text
            }}
          />
          <TextField
            id="date"
            label="Check In"
            type="date"
            defaultValue="2021-09-02"
            classes={{
              root: classes.TextField,
            }}
          />
        </form>
        <Select className={classes.Select} value="Guest" />
      </div>
    </>
  );
};
export default ReserveNightsForm;
