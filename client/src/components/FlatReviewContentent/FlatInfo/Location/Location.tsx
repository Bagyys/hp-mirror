//Styles
import classes from './location.module.scss';
//Components
import Map from '../../../Map/map';
interface LocationProps {
  cords?: { lat: number; lng: number };
}
const Location = (props: LocationProps) => {
  return (
    <>
      <div className={classes.Header}>
        <h3>Location</h3>
        <p>Hamburg, Moorfeet</p>
        <div className={classes.Map1}>
          <Map />
        </div>
      </div>
      <div className={classes.BorderLine}></div>
    </>
  );
};
export default Location;
