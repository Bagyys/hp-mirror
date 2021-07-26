import classes from "./main.module.scss";
import logo from "../../assets/images/Logo.svg";
import searchImg from "../../assets/images/Search.svg";
import { useEffect, useState } from "react";
import { DateRange, OnChangeProps } from "react-date-range";
import moment from "moment";

interface CustomRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

function Main() {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [range, setRange] = useState([
    {
      startDate: moment.utc().startOf("day").toDate(),
      endDate: moment.utc().add(1, "day").startOf("day").toDate(),
      key: "selection",
    },
  ]);
  const [forwardToGuests, setForwardToGuests] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [appState, changeState] = useState<any>({
    activeObject: null,

    objects: [
      { id: 1, title: "Check in", text: moment(startDate).format("MMM Do") },
      { id: 2, title: "Check out", text: moment(endDate).format("MMM Do") },
      { id: 3, title: "Guests", text: "add dates" },
    ],
  });

  let checkInText: string;
  let checkOUtText: string;
  if (startDate) {
    checkInText = moment(startDate).format("MMM Do");
  } else {
    checkInText = "add date";
  }

  if (endDate) {
    checkOUtText = moment(endDate).format("MMM Do");
  } else {
    checkOUtText = "add date";
  }

  useEffect(() => {
    changeState({
      activeObject: null,

      objects: [
        { id: 1, title: "Check in", text: checkInText },
        { id: 2, title: "Check out", text: checkOUtText },
        { id: 3, title: "Guests", text: "add dates" },
      ],
    });
  }, [startDate, endDate]);

  const hourlyCheckArray: Array<Date> = [];

  const toggleActive = (index: number) => {
    if (index === 0) {
      changeSearchState();
    }
    changeState({ ...appState, activeObject: appState.objects[index] });
  };

  const toggleActiveStyles = (index: number) => {
    if (appState.activeObject === null) {
      appState.activeObject = appState.objects[0];
    } else if (endDate && !startDate) {
      appState.activeObject = appState.objects[1];
    } else if (endDate && startDate) {
      appState.activeObject = appState.objects[2];
    }

    if (isSearching) {
      if (appState.objects[index] === appState.activeObject) {
        return `${classes.Active}`;
      } else {
        return `${classes.inActive}`;
      }
    } else {
      return `${classes.inActive}`;
    }
  };

  const changeSearchState = () => {
    if (!isSearching) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  const handleRange = (item: any) => {
    // TODO: solve typescript conflict
    console.log(item, "KAS ITEME");
    setStartDate(item.selection.startDate);
    setEndDate(item.selection.endDate);
    setRange([item.selection as CustomRange]);

    if (startDate && endDate) {
      setForwardToGuests(true);
    }
  };

  return (
    <div className={classes.Main}>
      <div className={classes.Left}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={classes.Right}>
        {isSearching ? (
          <h1 style={{ marginBottom: "13.8rem", marginTop: "4.6rem" }}>
            Hamburg
          </h1>
        ) : (
          <h1> Your happy stay in Hamburg</h1>
        )}
        {isSearching ? null : <p>Select dates for your home experience</p>}

        <div className={classes.DataPicker}>
          <div className={classes.Anytime}>Anytime</div>
          <div className={classes.active}>Calendar</div>
        </div>
        <div
          className={classes.SearchBox}
          style={
            isSearching
              ? {
                  marginTop: "13.39rem",
                  backgroundColor: "rgba(255, 255, 255, 0.85)",
                }
              : { padding: `0rem 5.1rem 0rem 0` }
          }
        >
          {appState.objects.map((element: any, index: number) => {
            return (
              <div
                className={toggleActiveStyles(index)}
                onClick={() => toggleActive(index)}
                style={
                  isSearching
                    ? { lineHeight: "2rem" }
                    : { lineHeight: "3.6rem" }
                }
              >
                <h2>{element.title}</h2>
                {isSearching ? <span>{element.text}</span> : null}
              </div>
            );
          })}
          <div
            className={classes.SearchButton}
            style={
              isSearching
                ? { right: `-13.6%`, padding: `1.6rem 2.5rem` }
                : { right: `-1.6%` }
            }
          >
            {isSearching ? <p className={classes.SearchText}>Search</p> : null}

            <img src={searchImg} alt="Search" />
          </div>
        </div>
        {isSearching ? (
          <div className={classes.Calendar}>
            {forwardToGuests ? (
              <div className={classes.GuestBox}>
                <div className={classes.Adults}>
                  <div>
                    <h1>Adults</h1>
                    <p>Age 13 and above</p>
                  </div>
                  <div>
                    <span>+</span>
                    <span>+</span>
                    <span>-</span>
                  </div>
                </div>
                <div className={classes.Children}>
                  <div>
                    <h1>Children</h1>
                    <p>Age 12 and under</p>
                  </div>
                  <div>
                    <span>+</span>
                    <span>+</span>
                    <span>-</span>
                  </div>
                </div>
              </div>
            ) : (
              <DateRange
                minDate={new Date()}
                editableDateInputs={true}
                onChange={(range: OnChangeProps) => {
                  handleRange(range);
                  //  setRange([range.selection as CustomRange]) // Typescript conflict
                }}
                moveRangeOnFirstSelection={false}
                ranges={range}
                disabledDates={hourlyCheckArray}
                weekStartsOn={1}
                weekdayDisplayFormat="EEEEEE"
                showMonthAndYearPickers={false}
                months={2}
                direction="horizontal"
                monthDisplayFormat="MMMM yyyy"
              />
            )}
            )
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Main;
