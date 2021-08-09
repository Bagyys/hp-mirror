import classes from "./main.module.scss";
import logo from "../../assets/images/Logo.svg";
import React, { useEffect, useState } from "react";
import { DateRange, OnChangeProps } from "react-date-range";
import moment from "moment";
import GuestContainer from "./components/guestContainer";
import Title from "./components/titleContainer";
import SearchProgress from "./components/searchProgression";
import SearchType from "./components/searchType";
import Calendar from "./components/calendar";
import { useSelector } from "react-redux";
import { StoreState } from "../../store/configureStore";

interface CustomRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

function Main() {
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  const forwardToGuests = mainPage.proceedToGuests;
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isCalendar, setIsCalendar] = useState<boolean>(true);

  const changeSearchState = () => {
    if (!isSearching) {
      setIsSearching(true);
    }
  };

  const chooseCalendarOrAnytime = () => {
    isCalendar ? setIsCalendar(false) : setIsCalendar(true);
  };

  console.log(forwardToGuests, "forwardToGuests");
  return (
    <div className={classes.Main}>
      <div className={classes.Left}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={classes.Right}>
        <Title isSearching={isSearching} />
        <SearchType choose={chooseCalendarOrAnytime} />
        {isCalendar ? (
          <React.Fragment>
            <SearchProgress
              isSearching={isSearching}
              changeSearch={changeSearchState}
            />
            {isSearching ? (
              <React.Fragment>
                {forwardToGuests ? <GuestContainer /> : <Calendar />}
              </React.Fragment>
            ) : null}
          </React.Fragment>
        ) : (
          <div>AnyTime</div>
        )}
      </div>
    </div>
  );
}

export default Main;
