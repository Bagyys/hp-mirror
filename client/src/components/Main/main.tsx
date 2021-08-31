import classes from "./main.module.scss";
import logo from "../../assets/images/Logo.svg";
import React, { useState } from "react";
import GuestContainer from "./components/guestContainer";
import Title from "./components/titleContainer";
import SearchProgress from "./components/searchProgression";
import SearchType from "./components/SearchType/searchType";
import Calendar from "./components/calendar";
import { useSelector } from "react-redux";
import { StoreState } from "../../store/configureStore";
import Anytime from "./components/anytime";
import AnyTimeIsGood from "./components/anytimeIsGood";
function Main() {
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  const forwardToGuests = mainPage.proceedToGuests;

  return (
    <div className={classes.Main}>
      <div className={classes.Left}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={classes.Right}>
        <Title />
        {mainPage.isSearching ? <SearchType /> : null}
        {mainPage.isCalendar ? (
          <React.Fragment>
            <SearchProgress />
            {mainPage.isSearching ? (
              <React.Fragment>
                {forwardToGuests ? <GuestContainer /> : <Calendar />}
              </React.Fragment>
            ) : (
              <AnyTimeIsGood />
            )}
          </React.Fragment>
        ) : (
          <Anytime />
        )}
      </div>
    </div>
  );
}

export default Main;
