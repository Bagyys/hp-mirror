import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import socket from "../../utilities/socketConnection";

import { StoreState } from "../../store/configureStore";
import { loadUser } from "../../store/actions/userActions";
import {
  getAllLocksAction,
  updateLockAction,
} from "../../store/actions/lockActions";
import { LockProps } from "../../store/reducers/lockReducer";
import Flats from "../../components/Flats/flats";
import Map from "../../components/Map/map";
import Lock from "../../containers/Lock/Lock";
import Filter from "../../components/Filter/filter";

import classes from "../../App.module.scss";

function Home() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getAllLocksAction());
    socket.on("lockUpdate", (data) => {
      const { id, o1, o2, o3 } = data;
      dispatch(updateLockAction(id, o1, o2, o3));
    });
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

  return (
    <div className={classes.App}>
      <Filter />
      <div className={classes.contentBox}>
        <Flats />
        <Map />
      </div>
      <h1>Hello there</h1>
      {lockComps}
    </div>
  );
}

export default Home;
