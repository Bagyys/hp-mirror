import Flats from '../../components/Flats/Flats';
import Map from '../../components/Map/map';
import Filter from '../../components/Filter/filter';
import Main from '../../components/Main/main';
import classes from '../../App.module.scss';
import Navigation from '../../components/Navigation/navigation';
import Footer from '../../components/Footer/Footer';
import { Fragment } from 'react';
const isChoosing = false;

function Home() {
  return (
    <div className={classes.App}>
      {/* If not used delete later with all component */}
      <Filter />

      {isChoosing ? (
        <Main />
      ) : (
        <Fragment>
          <Navigation />
          <div className={classes.contentBox}>
            <Flats />
            <Map />
          </div>
          <Footer />
        </Fragment>
      )}
    </div>
  );
}

export default Home;
