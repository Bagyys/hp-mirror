import classes from "../main.module.scss";
import searchImg from "../../../assets/images/Search.svg";
import { useEffect, useState } from "react";
import moment from "moment";
import { StoreState } from "../../../store/configureStore";
import { useSelector } from "react-redux";

interface searchProgressionProps {
  isSearching: boolean;
  startDate?: Date;
  endDate?: Date;
  changeSearch: () => void;
}

function SearchProgress(props: searchProgressionProps) {
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  const [appState, changeState] = useState<any>({
    activeObject: null,

    objects: [
      {
        id: 1,
        title: "Check in",
        text: mainPage.startDate,
      },
      {
        id: 2,
        title: "Check out",
        text: moment(mainPage.endDate).format("MMM Do"),
      },
      { id: 3, title: "Guests", text: "add dates" },
    ],
  });

  let checkInText: string;
  let checkOUtText: string;

  if (mainPage.startDate) {
    checkInText = moment(mainPage.startDate).format("MMM Do");
  } else {
    checkInText = "add date";
  }

  if (mainPage.endDate) {
    checkOUtText = moment(mainPage.endDate).format("MMM Do");
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
  }, [mainPage.startDate, mainPage.endDate]);

  const toggleActive = (index: number) => {
    if (index === 0) {
      props.changeSearch();
    }
    changeState({ ...appState, activeObject: appState.objects[index] });
  };

  const toggleActiveStyles = (index: number) => {
    if (!mainPage.startDate) {
      appState.activeObject = appState.objects[0];
    } else if (!mainPage.endDate && mainPage.startDate) {
      appState.activeObject = appState.objects[1];
    } else if (mainPage.endDate && mainPage.startDate) {
      appState.activeObject = appState.objects[2];
    }

    if (props.isSearching) {
      if (appState.objects[index] === appState.activeObject) {
        return `${classes.Active}`;
      } else {
        return `${classes.inActive}`;
      }
    } else {
      return `${classes.inActive}`;
    }
  };

  return (
    <div
      className={classes.SearchBox}
      style={
        props.isSearching
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
            key={index}
            className={toggleActiveStyles(index)}
            onClick={() => toggleActive(index)}
            style={
              props.isSearching
                ? { lineHeight: "2rem" }
                : { lineHeight: "3.6rem" }
            }
          >
            <h2>{element.title}</h2>
            {props.isSearching ? <span>{element.text}</span> : null}
          </div>
        );
      })}
      <div
        className={classes.SearchButton}
        style={
          props.isSearching
            ? { right: `-13.6%`, padding: `1.6rem 2.5rem` }
            : { right: `-1.6%` }
        }
      >
        {props.isSearching ? (
          <p className={classes.SearchText}>Search</p>
        ) : null}

        <img src={searchImg} alt="Search" />
      </div>
    </div>
  );
}

export default SearchProgress;
