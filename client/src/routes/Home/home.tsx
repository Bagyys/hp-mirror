import Flats from '../../components/Flats/flats';
import Map from '../../components/Map/map';
import { useMediaPredicate } from 'react-media-hook';
import Filter from '../../components/Filter/filter';
import SecondaryNavMobile from '../../components/SecondaryNavMobile/SecondaryNavMobile';
import Main from '../../components/Main/main';
import classes from '../../App.module.scss';
import Navigation from '../../components/Navigation/navigation';
import Footer from '../../components/Footer/Footer';
import { Fragment, useState } from 'react';
import Backdrop from '../../components/Backdrop/Backdrop';
import SideFilter from '../../components/SideFilter/SideFilter';
const isChoosing = false;
function Home() {
  const [show, setShow] = useState<boolean>(false);
  const isMobile = useMediaPredicate('(max-width: 675px)');

  const toggleHandler = () => {
    setShow(!show);
  };
  return (
    <div className={classes.App}>
      {/* If not used delete later with all component */}
      {/* <Filter /> */}
      {isChoosing ? (
        <Main />
      ) : (
        <Fragment>
          <Navigation />
          {isMobile && <SecondaryNavMobile toggleHandler={toggleHandler} />}
          {show && <SideFilter toggleHandler={toggleHandler} />}
          {!isMobile && (
            <Backdrop isVisible={show} toggleHandler={toggleHandler}></Backdrop>
          )}
          <div className={classes.contentBox}>
            <Flats toggleHandler={toggleHandler} />
            <Map />
          </div>
          <Footer />
        </Fragment>
      )}
    </div>
  );
}

export default Home;
