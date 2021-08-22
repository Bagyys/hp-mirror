import classes from './SecondaryNavMobile.module.scss';
import { Link } from 'react-router-dom';
import Button from '../Button/button';
import SearchBox from '../Navigation/SearchBox/SearchBox';
import favoriteMob from '../../assets/images/favorite_red.png';
import filterImg from '../../assets/images/filter.png';
interface SecondaryNavMobileProps {
  toggleHandler: () => void;
}
const SecondaryNavMobile: React.FC<SecondaryNavMobileProps> = (props) => (
  <div className={classes.SecondaryNavContainer}>
    <div className={classes.BtnContainer}>
      <Button clicked={props.toggleHandler} btnType="OpenFilter">
        <img src={filterImg} />
      </Button>
      <Link to="/favorites">
        <Button btnType="MobileFavorite">
          <img src={favoriteMob} alt="favorite-mobile" />
        </Button>
      </Link>
    </div>
    <SearchBox />
  </div>
);

export default SecondaryNavMobile;
