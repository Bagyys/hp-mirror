//Style
import classes from "./placeOffers.module.scss";
import WifiIcon from "../../../../../src/assets/images/wifi.png";

const PlaceOffers = () => {
  return (
    <>
      <div className={classes.Layer}>
        <h1>What this place offers</h1>
        <div>
          <div className={classes.Icons}>
            <div>
              <img src={WifiIcon} alt="img" />
              <p>1 Double bed</p>
            </div>
            <div>
              <img src={WifiIcon} alt="img" />
              <p>1 Double bed</p>
            </div>
            <div>
              <img src={WifiIcon} alt="img" />
              <p>1 Double bed</p>
            </div>
            <div>
              <img src={WifiIcon} alt="img" />
              <p>1 Double bed</p>
            </div>
            <div>
              <img src={WifiIcon} alt="img" />
              <p>1 Double bed</p>
            </div>
            <div>
              <img src={WifiIcon} alt="img" />
              <p>1 Double bed</p>
            </div>
            <div>
              <img src={WifiIcon} alt="img" />
              <p>1 Double bed</p>
            </div>
            <div>
              <img src={WifiIcon} alt="img" />
              <p>1 Double bed</p>
            </div>
            <div>
              <img src={WifiIcon} alt="img" />
              <p>1 Double bed</p>
            </div>
            <div>
              <img src={WifiIcon} alt="img" />
              <p>1 Double bed</p>
            </div>
            <div>
              <img src={WifiIcon} alt="img" />
              <p>1 Double bed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PlaceOffers;
