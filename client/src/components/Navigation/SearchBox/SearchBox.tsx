import classes from "./SearchBox.module.scss";
import searchImg from "../../../assets/images/Search.svg";
import { useSelector } from "react-redux";
import { StoreState } from "../../../store/configureStore";
import moment from "moment";

const SearchBox = () => {
  const mainPage = useSelector((state: StoreState) => state.mainPage);
  return (
    <div className={classes.SearchBoxs}>
      <div className={classes.Date}>
        {moment(mainPage.startDate).format("MMM Do")} -{" "}
        {moment(mainPage.endDate).format("MMM Do")}
      </div>
      <div className={classes.Guests}>
        {mainPage.guests.adults + mainPage.guests.children} guests
      </div>
      <div className={classes.SearchButton}>
        <img src={searchImg} alt="Search" />
      </div>
    </div>
  );
};
export default SearchBox;
