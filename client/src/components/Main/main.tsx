import classes from "./main.module.scss";
import logo from "../../assets/images/Logo.svg";
import searchImg from "../../assets/images/Search.svg";
import { useState } from "react";
function Home() {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [appState, changeState] = useState({
    activeObject: {},
    objects: [
      { id: 1, title: "Check in", text: "add dates" },
      { id: 2, title: "Check out", text: "add dates" },
      { id: 3, title: "Guests", text: "add dates" },
    ],
  });

  const toggleActive = (index: number) => {
    changeState({ ...appState, activeObject: appState.objects[index] });
  };

  const toggleActiveStyles = (index: number) => {
    if (appState.objects[index] === appState.activeObject) {
      return "active";
    } else {
      return "inActive";
    }
  };

  const changeSearchState = () => {
    if (!isSearching) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
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
          <div className={classes.active} onClick={() => changeSearchState()}>
            Calendar
          </div>
        </div>
        <div
          className={classes.SearchBox}
          style={
            isSearching
              ? {
                  padding: `1rem 5.1rem 1rem 4.41rem`,
                  marginTop: "13.39rem",
                  backgroundColor: "rgba(255, 255, 255, 0.85)",
                }
              : { padding: `1.3rem 5.1rem 1.3rem 4.41rem` }
          }
        >
          {appState.objects.map((element, index) => {
            return (
              <div
                className={classes.inActive}
                onClick={() => toggleActive(index)}
              >
                <h2>{element.title}</h2>
                {isSearching ? <span>{element.text}</span> : null}
              </div>
            );
          })}
          {/* <div className={isSearching ? classes.OnSearch : classes.CheckIn}>
            <h2>Check in</h2>
            {isSearching ? <span>add dates</span> : null}
          </div>
          <div className={isSearching ? classes.OnSearch : classes.CheckOut}>
            <h2>Check out</h2>
            {isSearching ? <span>add dates</span> : null}
          </div>
          <div className={isSearching ? classes.OnSearchGuest : classes.Guests}>
            <h2>Guests</h2>
            {isSearching ? <span>add guests</span> : null}
          </div> */}
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
      </div>
    </div>
  );
}

export default Home;
