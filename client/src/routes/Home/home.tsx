import { useDispatch } from "react-redux";
import { getDoorQuery, resetDoor } from "../../store/actions/doorsActions";
import Flats from "../../components/Flats/flats";
import Map from "../../components/Map/map";
import classes from "../../App.module.scss";
import Filter from "../../components/Filter/filter";
function Home() {
  const dispatch = useDispatch();

  const testAction = (arg: string) => {
    dispatch(getDoorQuery(arg));
  };
  const resetAction = () => {
    dispatch(resetDoor());
  };

  return (
    <div className={classes.App}>
      <Filter />
      <div className={classes.contentBox}>
        <Flats />
        <Map />
      </div>
      <h1>Hello there</h1>
      <button onClick={() => testAction("o1")}>Front Door</button>
      <button onClick={() => testAction("o2")}>Flat Door</button>
      <button onClick={() => resetAction()}>Reset Door</button>
    </div>
  );
}

export default Home;
