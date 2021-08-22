import classes from './DailyPrice.module.scss';
import { cn } from '../../../../utilities/joinClasses';
interface PriceProps {
  price?: number;
  priceClass: string;
}

const DailyPrice: React.FC<PriceProps> = (props) => (
  <p className={classes[props.priceClass]}>
    <span>{props.price}€</span>
    <span className={classes.Separator}>/</span>night
  </p>
);
export default DailyPrice;
