import classes from "../main.module.scss";
import SelectedMonthImg from "../../../assets/images/SelectedMonth.svg";
const months = [
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

function Anytime() {
  return (
    <div className={classes.AnytimeContainer}>
      {months.map((month, index) => {
        return (
          <div className={classes.month}>
            <img src={SelectedMonthImg} />
            <span>{month}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Anytime;
