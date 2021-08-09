import classes from './BottomFooter.module.scss';
import { Link } from 'react-router-dom';

const BottomFooter = () => {
  return (
    <div className={classes.bottomFooter}>
      <div className={classes.leftSide}>
        <Link to="/">2021 HappyStay</Link>
        <span>•</span>
        <Link to="#">Privacy</Link>
        <span>•</span>
        <Link to="#">Terms</Link>
        <span>•</span>
        <Link to="#">Legal acts</Link>
        <span>•</span>
        <Link to="#">Company details</Link>
      </div>
      <div className={classes.rightSide}>
        <p className={classes.euro}>
          €<span>EUR</span>
        </p>
        <p className={classes.symbols}>
          <span>t</span>
          <span>f</span>
          <span>c</span>
        </p>
      </div>
    </div>
  );
};
export default BottomFooter;
