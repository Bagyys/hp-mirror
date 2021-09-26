import classes from './Favorite.module.scss';
import Navigation from '../../components/Navigation/navigation';
import { useMediaPredicate } from 'react-media-hook';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import React from 'react';
import Flats from '../../components/Flats/Flats';
import SideFilter from '../../components/SideFilter/SideFilter';
import ReturnToList from '../components/ReturnToList/ReturnToList';
const Favorite = () => {
  const isMobile = useMediaPredicate('(max-width: 675px)');
  const history = useHistory();

  return (
    <React.Fragment>
      <Navigation />
      <div className={classes.FavoriteContainer}>
        {isMobile && <ReturnToList goBack={() => history.goBack()} />}
        <Flats />
      </div>
      <Footer />
      <SideFilter />
    </React.Fragment>
  );
};
export default Favorite;
