//Style
import classes from "./thingsToKnow.module.scss";

const ThingsToKnow = () => {
  return (
    <>
      <div className={classes.Layer}>
        <h3>Things to know</h3>
        <div className={classes.ListLayer}>
          <div className={classes.ListItems}>
            <h5>House rules</h5>
            <ul>
              <li>
                <span>Check-in 3:00 PM -3:00 PM</span>
              </li>
              <li>
                <span>Sefl check-in with virtual lock</span>
              </li>
              <li>
                <span>No pets</span>
              </li>
              <li>
                <span>No parties or event</span>
              </li>
              <li>
                <span>Smoking is allowed</span>
              </li>
            </ul>
          </div>
          <div className={classes.ListItems}>
            <h5>Health & safety</h5>
            <ul>
              <li>
                <span style={{ paddingBottom: "2.8rem" }}>
                  Social-distancing and other COVID-19-related guidelines apply
                </span>
              </li>
              <li>
                <span>
                  Potential for noise.There may sometimes be noise from other
                  guest or children
                </span>
              </li>
            </ul>
          </div>
          <div className={classes.ListItems}>
            <h5>Cancellation policy</h5>
            <ul>
              <li>
                <span>Free cancellation before July 6</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={classes.BorderLine}></div>
    </>
  );
};
export default ThingsToKnow;
