import classes from './SecondaryNavMobile.module.scss';
import { Link } from 'react-router-dom';
import Button from '../Button/button';
import SearchBox from '../../../components/Navigation/SearchBox/SearchBox';
import favoriteMob from '../../../assets/images/favorite_red.png';
import filterImg from '../../../assets/images/filter.png';
interface SecondaryNavMobileProps {
  isQuickViewClicked: boolean;
  toggleFilter: () => void;
}
const SecondaryNavMobile: React.FC<SecondaryNavMobileProps> = (props) => {
  return (
    <div
      style={
        props.isQuickViewClicked
          ? { margin: '1.2rem auto 0 auto' }
          : { margin: '8.2rem auto 0 auto' }
      }
      className={classes.SecondaryNavContainer}
    >
      <div className={classes.BtnContainer}>
        <Button
          clicked={props.toggleFilter}
          btnType="OpenFilter"
          bgColor="White"
        >
          <img src={filterImg} />
        </Button>
        <Link to="/favorites">
          <Button btnType="MobileSecondaryNavFavorite" bgColor="White">
            <img src={favoriteMob} alt="favorite-mobile" />
          </Button>
        </Link>
      </div>
      <SearchBox />
    </div>
  );
};

export default SecondaryNavMobile;
