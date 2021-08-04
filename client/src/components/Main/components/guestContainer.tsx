import classes from "../main.module.scss";
import React, { useState } from "react";

function GuestContainer() {
  const [numberOfChildren, setNumberOfChildren] = useState<number>(0);
  const [numberOfAdults, setNumberOfAdults] = useState<number>(0);

  const increment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "children") {
      setNumberOfChildren(numberOfChildren + 1);
    } else if (e.target.id === "adults") {
      setNumberOfAdults(numberOfAdults + 1);
    }
  };

  const decrement = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "children") {
      setNumberOfChildren(numberOfChildren - 1);
      if (numberOfChildren <= 0) {
        setNumberOfChildren(0);
      }
    } else if (e.target.id === "adults") {
      setNumberOfAdults(numberOfAdults - 1);
      if (numberOfAdults <= 0) {
        setNumberOfAdults(0);
      }
    }
  };

  return (
    <div className={classes.GuestWrapper}>
      <div className={classes.GuestBox}>
        <div className={classes.Upper}>
          <div className={classes.DescriptionSide}>
            <h1>Adults</h1>
            <p>Age 13 and above</p>
          </div>
          <div className={classes.Counting}>
            <span
              id="adults"
              onClick={(e: any) => decrement(e)}
              className={classes.Decrement}
            >
              -
            </span>
            <span className={classes.Number}>{numberOfAdults}</span>
            <span
              id="adults"
              onClick={(e: any) => increment(e)}
              className={classes.Increment}
            >
              +
            </span>
          </div>
        </div>
        <div className={classes.Down}>
          <div className={classes.DescriptionSide}>
            <h1>Children</h1>
            <p>Age under 12</p>
          </div>
          <div className={classes.Counting}>
            <span
              id="children"
              onClick={(e: any) => decrement(e)}
              className={classes.Decrement}
            >
              -
            </span>
            <span className={classes.Number}>{numberOfChildren}</span>
            <span
              id="children"
              onClick={(e: any) => increment(e)}
              className={classes.Increment}
            >
              +
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestContainer;
