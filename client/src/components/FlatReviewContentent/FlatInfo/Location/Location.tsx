//Styles
import classes from "./location.module.scss";
//Components
import Map from "../../../Map/map";

const Location = () => {
  return (
    <>
      <div className={classes.Header}>
        <h3>Location</h3>
        <p>Hamburg, Moorfeet</p>
        <div className={classes.Map}>
          <Map style={"Map1"} />
        </div>
      </div>
    </>
  );
};
export default Location;
