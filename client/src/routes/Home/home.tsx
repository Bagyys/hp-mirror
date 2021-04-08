import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import socket, { testAction } from "../../utilities/socketConnection";

import { StoreState } from "../../store/configureStore";
import Flats from "../../components/Flats/flats";
import Map from "../../components/Map/map";
import Lock from "../../containers/Lock/Lock";
import { getAllLocksAction } from "../../store/actions/lockActions";
import { LockProps } from "../../store/reducers/lockReducer";

import classes from "../../App.module.scss";
import Filter from "../../components/Filter/filter";
function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllLocksAction());
  }, []);
  const locks: Array<LockProps> = useSelector(
    (state: StoreState) => state.lock.locks
  );

  useEffect(() => {}, [locks]);
  let lockComps = null;
  if (locks !== undefined && locks !== null) {
    lockComps = locks.map((lock: LockProps, index: number) => {
      return <Lock key={lock._id} index={index} />;
    });
  } else {
    lockComps = <></>;
  }

  socket.on("lockUpdate", (data) => {
    console.log("lockUpdate data received on client");
    console.log(data);
  });
  return (
    <div className={classes.App}>
      <Filter />
      <div className={classes.contentBox}>
        <Flats />
        <Map />
      </div>
      <h1 onClick={testAction}>Hello there</h1>
      {lockComps}
    </div>
  );
}

export default Home;
