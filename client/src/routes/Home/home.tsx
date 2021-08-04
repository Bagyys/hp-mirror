import Flats from "../../components/Flats/flats";
import Map from "../../components/Map/map";
import Filter from "../../components/Filter/filter";
import Main from "../../components/Main/main";
import classes from "../../App.module.scss";
import Navigation from "../../components/Navigation/navigation";
const isChoosing = true;

function Home() {
  return (
    <div className={classes.App}>
      {/* If not used delete later with all component */}
      {/* <Filter /> */}

      {isChoosing ? (
        <Main />
      ) : (
        <div className={classes.contentBox}>
          {/* <Navigation /> */}
          <Flats />
          <Map />
        </div>
      )}
    </div>
  );
}

export default Home;
