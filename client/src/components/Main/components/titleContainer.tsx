import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../../store/configureStore";

const Title = () => {
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  return (
    <React.Fragment>
      {mainPage.isSearching ? (
        <h1 style={{ marginBottom: "13.8rem", marginTop: "4.6rem" }}>
          Hamburg
        </h1>
      ) : (
        <h1> Your happy stay in Hamburg</h1>
      )}
      {!mainPage.isSearching ? <p>When are you planning to stay? </p> : null}
    </React.Fragment>
  );
};

export default Title;
