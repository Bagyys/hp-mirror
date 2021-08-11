import { useState } from "react";
import classes from "../main.module.scss";

function SearchType() {
  const [numberToMove, setNumberToMove] = useState<number>(10);
  const switcher = (number: number) => {
    setNumberToMove(number);
  };

  return (
    <div className={classes.DataPicker}>
      <div onClick={() => switcher(61)} className={classes.Anytime}>
        Anytime
      </div>
      <div onClick={() => switcher(10)} className={classes.active}>
        Calendar
      </div>
      <span style={{ right: `${numberToMove}%`, top: "80%" }}></span>
    </div>
  );
}

export default SearchType;
