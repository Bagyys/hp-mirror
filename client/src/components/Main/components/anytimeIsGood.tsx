import { Dispatch, SetStateAction } from "react";
import classes from "../main.module.scss";

interface anytimeProps {
  setCalendar: Dispatch<SetStateAction<boolean>>;
}

function AnytimeIsGood(props: anytimeProps) {
  return (
    <div
      className={classes.AnyTimeIsGood}
      onClick={() => props.setCalendar(false)}
    >
      Anytime is good &gt;
    </div>
  );
}

export default AnytimeIsGood;
