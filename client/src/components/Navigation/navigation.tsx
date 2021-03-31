import classes from "./navigation.module.scss";
import { BrowserRouter as Router, Link } from "react-router-dom";
import NotificationImg from "../../assets/images/bell.png";
import ProfileImg from "../../assets/images/profile.png";
import LogoImg from "../../assets/images/Logo.png";
function Navigation() {
  return (
    <div className={classes.Navigation}>
      <div className={classes.NavigationWrapper}>
        <div className={classes.Logo}>
          <a href="/">
            <img src={LogoImg} alt="Logo" />
          </a>
        </div>

        <div className={classes.Routes}>
          <Router>
            <ul>
              <li>
                <Link to="/reservation">Reservations</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
              <li>
                <Link to="/history">History</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
          </Router>
        </div>

        <div className={classes.Profile}>
          <div className={classes.bell}>
            <img src={NotificationImg} alt="Notification Bell" />
          </div>
          <img src={ProfileImg} alt="Profile" />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
