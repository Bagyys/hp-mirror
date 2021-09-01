import classes from "./buttons.module.scss";
import searchImg from "../../../../assets/images/Search.svg";

const GuestContainer = () => {
  return (
    <div className={classes.MobileButton}>
      <p id={classes.ButtonText}>Search</p>
      <img src={searchImg} alt="Search" />
    </div>
  );
};

export default GuestContainer;
