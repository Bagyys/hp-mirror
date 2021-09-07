import classes from './Favorite.module.scss';
import arrow from '../../assets/images/arrow2.png';
import Navigation from '../../components/Navigation/navigation';
import { useMediaPredicate } from 'react-media-hook';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import React from 'react';
import Flats from '../../components/Flats/flats';
const Favorite = () => {
  const isMobile = useMediaPredicate('(max-width: 675px)');
  const history = useHistory();

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
        <Flats isMain={false} />
      </div>
      <Footer />
    </React.Fragment>
  );
};
export default Favorite;
