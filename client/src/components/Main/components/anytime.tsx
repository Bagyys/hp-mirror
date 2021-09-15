import classes from "../main.module.scss";
import SelectedMonthImg from "../../../assets/images/selected_month.svg";
import NonSelectedImg from "../../../assets/images/non_selected.svg";
import { useState } from "react";
import moment from "moment";
import searchImg from "../../../assets/images/search.svg";
import { useMediaPredicate } from "react-media-hook";

function Anytime() {
  const months: Array<string> = [];
  const isMobile = useMediaPredicate("(max-width: 675px)");
  const isLaptop = useMediaPredicate("(max-width: 1660px)");
  let numberOfMonths = isMobile ? 4 : isLaptop ? 6 : 8;

  for (let index = 0; index < numberOfMonths; index++) {
    let date = new Date();
    let newDate = new Date(date.setMonth(date.getMonth() + index));
    const formatMonth = moment(newDate).format("MMMM");
    months.push(formatMonth);
  }

  const [selectedArray, setSelectedArray] = useState<Array<string>>([]);
  const pushToArray = (index: number, month: string) => {
    setSelectedArray([...selectedArray, month]);
    let htmlElement = document.getElementById(month);
    htmlElement?.classList.toggle(classes.month);
    htmlElement?.classList.toggle(classes.active);
    let notSelectedImg = document.getElementById(month + `picture`);
    if (
      notSelectedImg?.style.display === "block" ||
      notSelectedImg?.style.display === ""
    ) {
      notSelectedImg.style.display = "none";
    } else if (notSelectedImg?.style.display === "none") {
      notSelectedImg.style.display = "block";
    }
  };

  return (
    <div className={classes.AnytimeContainer}>
      {months.map((month, index) => {
        return (
          <div
            key={index}
            id={month}
            className={classes.month}
            onClick={() => pushToArray(index, month)}
          >
            <img id={month + `picture`} src={NonSelectedImg} />
            <img className={classes.SelectedImg} src={SelectedMonthImg} />
            <span>{month}</span>
          </div>
        );
      })}
      <div className={classes.SearchButton}>
        <p className={classes.SearchText}>Search</p>
        <img src={searchImg} alt="Search" />
      </div>
    </div>
  );
}

export default Anytime;
