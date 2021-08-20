import Flats from "../../components/Flats/flats";
import Map from "../../components/Map/map";
import Filter from "../../components/Filter/filter";
import Main from "../../components/Main/main";
import classes from "../../App.module.scss";
import Navigation from "../../components/Navigation/navigation";
import Footer from "../../components/Footer/Footer";
import { Fragment, useState } from "react";
import Backdrop from "../../components/Backdrop/Backdrop";
import SideFilter from "../../components/SideFilter/SideFilter";
const isChoosing = false;
function Home() {
  const [show, setShow] = useState<boolean>(false);
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
          {show && <SideFilter toggleHandler={toggleHandler} />}
          <Backdrop isVisible={show} toggleHandler={toggleHandler}></Backdrop>
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
