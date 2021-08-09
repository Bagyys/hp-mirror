import React from "react";

interface TitleProps {
  isSearching: boolean;
}

function Title({ isSearching }: TitleProps) {
  return (
    <React.Fragment>
      {isSearching ? (
        <h1 style={{ marginBottom: "13.8rem", marginTop: "4.6rem" }}>
          Hamburg
        </h1>
      ) : (
        <h1> Your happy stay in Hamburg</h1>
      )}
      {isSearching ? null : <p>Select dates for your home experience</p>}
    </React.Fragment>
  );
}

export default Title;
