import classes from './SecondaryNavMobile.module.scss';
import { Link } from 'react-router-dom';
import Button from '../Button/button';
import SearchBox from '../Navigation/SearchBox/SearchBox';
import favoriteMob from '../../assets/images/favorite_red.png';
import filterImg from '../../assets/images/filter.png';
import { useDispatch, useSelector } from 'react-redux';
import { FilterState } from '../../store/reducers/filterReducer';
import { StoreState } from '../../store/configureStore';
import { toggleFilterButtonAction } from '../../store/actions/filterActions';
interface SecondaryNavMobileProps {
  isQuickViewClicked: boolean;
}
const SecondaryNavMobile: React.FC<SecondaryNavMobileProps> = (props) => {
  const dispatch = useDispatch();
  const filter: FilterState = useSelector((state: StoreState) => state.filter);
  const { isFilterOpen } = filter;

  const toggleFilterHandler = () => {
    dispatch(toggleFilterButtonAction(!isFilterOpen));
  };
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
          clicked={toggleFilterHandler}
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
