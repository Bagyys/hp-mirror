import Flats from "../../components/Flats/flats";
import Map from "../../components/Map/map";
import Filter from "../../components/Filter/filter";

import classes from "../../App.module.scss";

function Home() {
  return (
    <div className={classes.App}>
      <Filter />
      <div className={classes.contentBox}>
        <Flats />
        <Map />
      </div>
    </div>
  );
}

export default Home;
