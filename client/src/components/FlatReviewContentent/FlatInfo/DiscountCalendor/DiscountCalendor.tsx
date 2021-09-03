//Styles
import classes from "../DiscountCalendor/discountCalendor.module.scss";

//Components
import Calendor from "../../../Main/components/calendar";

const DiscountCalendor = () => {
  return (
    <>
      <div className={classes.Layer}>
        <div className={classes.Header}>
          <h3>7 nights</h3>
          <p>Jul 7, 2021 - Jul 14, 2021</p>
        </div>
        <div className={classes.DiscountInfo}>
          <h4>Chose different dates and see what discount you can get</h4>
          <div className={classes.DiscountText}>
            <div className={classes.DiscountText}>
              <span className={classes.span1}>-5%</span>
              <p>
                when booking <span>one week</span>
              </p>
            </div>
            <div className={classes.DiscountText}>
              <span className={classes.span1}>-2000%</span>
              <p>
                when booking <span>one month</span>
              </p>
            </div>
          </div>
        </div>
        <Calendor />
      </div>
    </>
  );
};
export default DiscountCalendor;
