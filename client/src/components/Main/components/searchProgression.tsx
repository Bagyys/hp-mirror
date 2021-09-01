import classes from "../main.module.scss";
import searchImg from "../../../assets/images/Search.svg";
import { useEffect, useState } from "react";
import moment from "moment";
import { StoreState } from "../../../store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import {
  setProceedToGuests,
  toggleIsSearching,
} from "../../../store/actions/mainPageActions";
import { useMediaPredicate } from "react-media-hook";
import React from "react";

interface activeObjectInterface {
  activeObject: null | {
    id: number;
    title: string;
    text: string;
  };

  objects: { id: number; title: string; text: string }[];
}

function SearchProgress() {
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  const dispatch = useDispatch();
  const adults = mainPage.guests.adults;
  const children = mainPage.guests.children;
  const isMobile = useMediaPredicate("(max-width: 675px)");
  const isLaptop = useMediaPredicate("(max-width: 1660px)");
  const [appState, changeState] = useState<activeObjectInterface>({
    activeObject: { id: 1, title: "Check in", text: "" },

    objects: [
      {
        id: 1,
        title: "Check in",
        text: moment(mainPage.startDate).format("MMM Do"),
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
  let guests: string;
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

  if (adults > 0 || children > 0) {
    const totalGuests = adults + children;
    guests = `Guests: ${totalGuests}`;
  } else {
    guests = "add guests";
  }

  useEffect(() => {
    changeState({
      activeObject: null,

      objects: [
        { id: 1, title: "Check in", text: checkInText },
        { id: 2, title: "Check out", text: checkOUtText },
        { id: 3, title: "Guests", text: guests },
      ],
    });
  }, [mainPage.startDate, mainPage.endDate, adults, children]);

  const changeSearchState = () => {
    dispatch(setProceedToGuests(false));
    if (!mainPage.isSearching) {
      dispatch(toggleIsSearching(true));
    }
  };

  const toggleActive = (index: number) => {
    if (index === 0) {
      changeSearchState();
    } else if (index !== 2) {
      dispatch(setProceedToGuests(false));
    } else if (index === 2) {
      dispatch(setProceedToGuests(true));
    }
    changeState({ ...appState, activeObject: appState.objects[index] });
  };

  const toggleActiveStyles = (index: number) => {
    if (mainPage.isSearching) {
      if (appState.objects[index] === appState.activeObject) {
        return `${classes.Active}`;
      } else {
        return `${classes.inActive}`;
      }
    } else if (!mainPage.isSearching) {
      appState.activeObject = appState.objects[0];
      if (appState.objects[index] === appState.activeObject) {
        return `${classes.Active}`;
      } else {
        return `${classes.inActive}`;
      }
    }
  };

  return (
    <div
      className={classes.SearchBox}
      // style={
      //   mainPage.isSearching
      //     ? {
      //         marginTop: "6.7rem",
      //         backgroundColor: "rgba(255, 255, 255, 0.85)",
      //       }
      //     : { padding: `0` }
      // }
    >
      {appState.objects.map(
        (element: { title: string; text: string }, index: number) => {
          return (
            <React.Fragment>
              {isMobile ? (
                <div
                  key={index}
                  className={toggleActiveStyles(index)}
                  onClick={() => toggleActive(index)}
                  style={
                    mainPage.isSearching
                      ? {
                          lineHeight: "2rem",
                        }
                      : {
                          lineHeight: "5.5rem",
                        }
                  }
                >
                  <h2>
                    {element.title}
                    <br />
                    {mainPage.isSearching ? <span>{element.text}</span> : null}
                  </h2>
                </div>
              ) : (
                <div
                  key={index}
                  className={toggleActiveStyles(index)}
                  onClick={() => toggleActive(index)}
                  style={
                    mainPage.isSearching
                      ? {
                          padding: "0.9rem 0 ",
                          lineHeight: "2rem",
                          fontSize: "1.9rem",
                        }
                      : {
                          padding: "1.2rem",
                          lineHeight: "2rem",
                        }
                  }
                >
                  <h2
                    style={
                      mainPage.isSearching
                        ? { padding: "0.3rem 0" }
                        : { padding: "0.8rem 0" }
                    }
                  >
                    {element.title}
                    <br />
                    {mainPage.isSearching ? <span>{element.text}</span> : null}
                  </h2>
                </div>
              )}
            </React.Fragment>
          );
        }
      )}
      {mainPage.isSearching ? (
        <React.Fragment>
          {isLaptop ? null : (
            <div
              className={classes.SearchButton}
              style={{ right: "0%", padding: "1.8rem 1.7rem 1.8rem 1.5rem" }}
            >
              <p className={classes.SearchText}>Search</p>
              <img src={searchImg} alt="Search" />
            </div>
          )}
        </React.Fragment>
      ) : (
        <div className={classes.SearchButton}>
          <p className={classes.SearchText}></p>
          <img src={searchImg} alt="Search" />
        </div>
      )}
    </div>
  );
}

export default SearchProgress;
