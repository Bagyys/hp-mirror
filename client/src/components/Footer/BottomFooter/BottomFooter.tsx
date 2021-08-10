import classes from './BottomFooter.module.scss';
import { Link } from 'react-router-dom';

const BottomFooter = () => {
  return (
    <div className={classes.BottomFooter}>
      <div className={classes.LeftSide}>
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
      <div className={classes.RightSide}>
        <p className={classes.Euro}>
          €<span>EUR</span>
        </p>
        <p className={classes.Symbols}>
          <span>t</span>
          <span>f</span>
          <span>c</span>
        </p>
      </div>
    </div>
  );
};
export default BottomFooter;
