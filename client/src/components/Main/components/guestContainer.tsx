import classes from "../main.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import minus from "../../../assets/images/minus.png";
import plus from "../../../assets/images/plus.png";
import { setNumberOfAdultsAndChildren } from "../../../store/actions/mainPageActions";
import CounterButton from "../../SideFilter/CounterButton/CounterButton";
import { useMediaPredicate } from "react-media-hook";
import MobileButton from "./Buttons/mobileButton";
import { StoreState } from "../../../store/configureStore";
function GuestContainer() {
  const isMobile = useMediaPredicate("(max-width: 675px)");
  const dispatch = useDispatch();
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  const [numberOfChildren, setNumberOfChildren] = useState<number>(
    mainPage.guests.children
  );
  const [numberOfAdults, setNumberOfAdults] = useState<number>(
    mainPage.guests.adults
  );

  /* naujas kodas */
  const counterHandler = (guest: string, diff: number) => {
    guest === "adult" && setNumberOfAdults(numberOfAdults + diff);
    guest === "children" && setNumberOfChildren(numberOfChildren + diff);
  };
  useEffect(() => {
    dispatch(setNumberOfAdultsAndChildren(numberOfAdults, numberOfChildren));
  }, [numberOfChildren, numberOfAdults]);

  return (
    <div className={classes.GuestWrapper}>
      <div className={classes.GuestBox}>
        <div className={classes.Upper}>
          <div className={classes.DescriptionSide}>
            <h1>Adults</h1>
            <p>Age 13 and above</p>
          </div>
          <div className={classes.Counting}>
            <CounterButton
              btnType="MainGuestCounter"
              clicked={() => counterHandler("adult", -1)}
              isDisabled={numberOfAdults === 0}
            >
              <img src={minus} />
            </CounterButton>
            <span className={classes.Number}>{numberOfAdults}</span>
            <CounterButton
              btnType="MainGuestCounter"
              clicked={() => counterHandler("adult", +1)}
              isDisabled={false}
            >
              <img src={plus} />
            </CounterButton>
          </div>
        </div>
        <div className={classes.Down}>
          <div className={classes.DescriptionSide}>
            <h1>Children</h1>
            <p>Age under 12</p>
          </div>
          <div className={classes.Counting}>
            <CounterButton
              btnType="MainGuestCounter"
              clicked={() => counterHandler("children", -1)}
              isDisabled={numberOfChildren === 0}
            >
              <img src={minus} />
            </CounterButton>
            <span className={classes.Number}>{numberOfChildren}</span>
            <CounterButton
              btnType="MainGuestCounter"
              clicked={() => counterHandler("children", +1)}
              isDisabled={false}
            >
              <img src={plus} />
            </CounterButton>
          </div>
        </div>
      </div>
      {isMobile ? <MobileButton /> : null}
    </div>
  );
}

export default GuestContainer;
