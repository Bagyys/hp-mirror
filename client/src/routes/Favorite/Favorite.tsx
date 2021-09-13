import classes from './Favorite.module.scss';
import arrow from '../../assets/images/arrow2.png';
import Navigation from '../../components/Navigation/navigation';
import { useMediaPredicate } from 'react-media-hook';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import React from 'react';
import Flats from '../../components/Flats/Flats';
import { FilterState } from '../../store/reducers/filterReducer';
import { StoreState } from '../../store/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import SideFilter from '../../components/SideFilter/SideFilter';
import { toggleFilterButtonAction } from '../../store/actions/filterActions';
const Favorite = () => {
  const isMobile = useMediaPredicate('(max-width: 675px)');
  const history = useHistory();
  const dispatch = useDispatch();
  const filterSide: FilterState = useSelector(
    (state: StoreState) => state.filter
  );
  const toggleFilterHandler = () => {
    dispatch(toggleFilterButtonAction(!isFilterOpen));
  };
  const { isFilterOpen } = filterSide;
  return (
    <React.Fragment>
      <Navigation />
      <div className={classes.FavoriteContainer}>
        {isMobile && (
          <div onClick={() => history.goBack()} className={classes.Return}>
            <img src={arrow} />
            Return to list
          </div>
        )}
        <Flats isMain={false} toggleFilter={toggleFilterHandler} />
      </div>
      <Footer />
      {isFilterOpen && <SideFilter toggleHandler={toggleFilterHandler} />}
    </React.Fragment>
  );
};
export default Favorite;
