import classes from './Prices.module.scss';
interface PriceProps {
  price?: number;
}

const Prices: React.FC<PriceProps> = (props) => (
  <div className={classes.PriceContainer}>
    <p className={classes.Price}>
      <span>{props.price}€</span>/night
    </p>
    <p className={classes.TotalPrice}>244€ total</p>
  </div>
);
export default Prices;
