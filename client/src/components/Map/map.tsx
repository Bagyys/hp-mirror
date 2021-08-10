import classes from './map.module.scss';
import map from '../../assets/images/map.png';
function Map() {
  return (
    <div className={classes.Map}>
      <img className={classes.MapImg} src={map} />
    </div>
  );
}

export default Map;
