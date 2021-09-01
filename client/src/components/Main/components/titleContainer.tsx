import React from "react";
import { useMediaPredicate } from "react-media-hook";
import { useSelector } from "react-redux";
import { StoreState } from "../../../store/configureStore";

const Title = () => {
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  const isMobile = useMediaPredicate("(max-width: 675px)");
  const title = isMobile ? "" : "Hamburg";
  return (
    <React.Fragment>
      {mainPage.isSearching ? (
        <h1
          style={
            isMobile
              ? { display: "none" }
              : { marginBottom: "11rem", marginTop: "11rem" }
          }
        >
          {title}
        </h1>
      ) : (
        <h1> Your happy stay in Hamburg</h1>
      )}
      {!mainPage.isSearching ? (
        <p>
          {isMobile
            ? "Select dates for your home "
            : "When are you planning to stay?"}
        </p>
      ) : null}
    </React.Fragment>
  );
};

export default Title;
