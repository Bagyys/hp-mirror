//Styles
import classes from './location.module.scss';
//Components
import Map from '../../../../components/Map/map';

const Location = () => {

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
