import classes from './TopFooter.module.scss';
import { Link } from 'react-router-dom';
const TopFooter = () => {
  return (
    <div className={classes.topFooterContainer}>
      <div className={classes.linkBoxes}>
        <p>About</p>
        <Link to="#">About HappyStay</Link>
        <Link to="#">Digital key unlock</Link>
        <Link to="#">Safety & Insurance</Link>
        <Link to="#">News</Link>
        <Link to="#">Happy for Work</Link>
      </div>
      <div className={classes.linkBoxes}>
        <p>Community</p>
        <Link to="#">HappyStay community</Link>
        <Link to="#">Guest Referrals</Link>
        <Link to="#">Accessibility</Link>
        <Link to="#">Community Center</Link>
      </div>
      <div className={classes.linkBoxes}>
        <p>Host</p>
        <Link to="#">Host your home</Link>
        <Link to="#">Hosting rules</Link>
        <Link to="#">Refer host</Link>
        <Link to="#">Resource Center</Link>
      </div>
      <div className={classes.linkBoxes}>
        <p>Support</p>
        <Link to="#">Help Center</Link>
        <Link to="#">Cacellation options</Link>
        <Link to="#">Trust & Safety</Link>
        <Link to="#">Our COVID-19</Link>
        <Link to="#">Responses</Link>
      </div>
    </div>
  );
};
export default TopFooter;
