import classes from './SearchBox.module.scss';
import searchImg from '../../../assets/images/Search.svg';

const SearchBox: React.FC = () => (
  <div className={classes.SearchBoxs}>
    <div className={classes.Date}>July 1 - July 7</div>
    <div className={classes.Guests}>2 guests</div>
    <div className={classes.SearchButton}>
      <img src={searchImg} alt="Search" />
    </div>
  </div>
);
export default SearchBox;
