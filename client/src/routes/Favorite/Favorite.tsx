import classes from './Favorite.module.scss';
import arrow from '../../assets/images/arrow2.png';
import Navigation from '../../components/Navigation/navigation';
import { useMediaPredicate } from 'react-media-hook';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userState } from '../../store/reducers/userReducer';
import { StoreState } from '../../store/configureStore';
import { PropertyState } from '../../store/reducers/propertyReducer';
import Footer from '../../components/Footer/Footer';
import React from 'react';
import Flats from '../../components/Flats/flats';
const Favorite = () => {
  const isMobile = useMediaPredicate('(max-width: 675px)');
  const propertyStore: PropertyState = useSelector(
    (state: StoreState) => state.property
  );
  const { properties } = propertyStore;
  const auth: userState = useSelector((state: StoreState) => state.user);
  const { user } = auth;
  const history = useHistory();

  const favoriteList = properties?.filter((item) => {
    return user?.favorites?.includes(item._id);
  });
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
        <Flats properties={favoriteList} isMain={false} />
      </div>
      <Footer />
    </React.Fragment>
  );
};
export default Favorite;
