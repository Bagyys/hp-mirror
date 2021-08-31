import classes from '../main.module.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import minus from '../../../assets/images/minus.png';
import plus from '../../../assets/images/plus.png';
import { setNumberOfAdultsAndChildren } from '../../../store/actions/mainPageActions';
import CounterButton from '../../SideFilter/CounterButton/CounterButton';

function GuestContainer() {
  const dispatch = useDispatch();
  const [numberOfChildren, setNumberOfChildren] = useState<number>(0);
  const [numberOfAdults, setNumberOfAdults] = useState<number>(0);

  // const increment = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
  //   const target = e.target as HTMLInputElement;
  //   if (target.id === "children") {
  //     setNumberOfChildren(numberOfChildren + 1);
  //   } else if (target.id === "adults") {
  //     setNumberOfAdults(numberOfAdults + 1);
  //   }
  // };

  /* naujas kodas */
  const counterHandler = (guest: string, diff: number) => {
    guest === 'adult' && setNumberOfAdults(numberOfAdults + diff);
    guest === 'children' && setNumberOfChildren(numberOfChildren + diff);
  };
  useEffect(() => {
    dispatch(setNumberOfAdultsAndChildren(numberOfAdults, numberOfChildren));
  }, [numberOfChildren, numberOfAdults]);

  // const decrement = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
  //   const target = e.target as HTMLInputElement;
  //   if (target.id === "children") {
  //     setNumberOfChildren(numberOfChildren - 1);
  //     if (numberOfChildren <= 0) {
  //       setNumberOfChildren(0);
  //     }
  //   } else if (target.id === "adults") {
  //     setNumberOfAdults(numberOfAdults - 1);
  //     if (numberOfAdults <= 0) {
  //       setNumberOfAdults(0);
  //     }
  //   }
  // };

  return (
    <div className={classes.GuestWrapper}>
      <div className={classes.GuestBox}>
        <div className={classes.Upper}>
          <div className={classes.DescriptionSide}>
            <h1>Adults</h1>
            <p>Age 13 and above</p>
          </div>
          <div className={classes.Counting}>
            {/* <span
              id="adults"
              onClick={(e) => decrement(e)}
              className={classes.Decrement}
              style={
                numberOfAdults <= 0
                  ? { backgroundColor: 'transparent' }
                  : {
                      backgroundColor: '#EBEDED',
                      border: 'none',
                      color: '#9E9E9F',
                    }
              }
            >
              -
            </span> */}
            <CounterButton
              btnType="MainGuestCounter"
              clicked={() => counterHandler('adult', -1)}
              isDisabled={numberOfAdults === 0}
            >
              <img src={minus} />
            </CounterButton>
            <span className={classes.Number}>{numberOfAdults}</span>
            <CounterButton
              btnType="MainGuestCounter"
              clicked={() => counterHandler('adult', +1)}
              isDisabled={false}
            >
              <img src={plus} />
            </CounterButton>
            {/* <span
              id="adults"
              onClick={(e) => increment(e)}
              className={classes.Increment}
            >
              +
            </span> */}
          </div>
        </div>
        <div className={classes.Down}>
          <div className={classes.DescriptionSide}>
            <h1>Children</h1>
            <p>Age under 12</p>
          </div>
          <div className={classes.Counting}>
            {/* <span
              id="children"
              onClick={(e) => decrement(e)}
              className={classes.Decrement}
              style={
                numberOfChildren <= 0
                  ? { backgroundColor: 'transparent' }
                  : {
                      backgroundColor: '#EBEDED',
                      border: 'none',
                      color: '#9E9E9F',
                    }
              }
            >
              -
            </span> */}
            <CounterButton
              btnType="MainGuestCounter"
              clicked={() => counterHandler('children', -1)}
              isDisabled={numberOfChildren === 0}
            >
              <img src={minus} />
            </CounterButton>
            <span className={classes.Number}>{numberOfChildren}</span>
            <CounterButton
              btnType="MainGuestCounter"
              clicked={() => counterHandler('children', +1)}
              isDisabled={false}
            >
              <img src={plus} />
            </CounterButton>
            {/* <span
              id="children"
              onClick={(e) => increment(e)}
              className={classes.Increment}
            >
              +
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestContainer;
