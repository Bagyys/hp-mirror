//Style
import classes from "./DailyPrice.module.scss";
//Utilities
import { cn } from "../../../utilities/joinClasses";
interface PriceProps {
  price?: number;
  active: boolean;
}

const DailyPrice: React.FC<PriceProps> = (props) => (
  <p className={cn(props.active ? classes.BookingPrice : classes.Price)}>
    <span>{props.price}€</span>
    <span className={classes.Separator}>/</span>night
  </p>
);
export default DailyPrice;
