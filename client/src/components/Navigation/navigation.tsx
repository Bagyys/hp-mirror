import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { StoreState } from "../../store/configureStore";
import { logoutAction } from "../../store/actions/userActions";
import NotificationImg from "../../assets/images/bell.png";
import ProfileImg from "../../assets/images/profile.png";
import LogoImg from "../../assets/images/Logo.png";
import user from "../../assets/images/user.png";
import logout from "../../assets/images/logout.png";
import register from "../../assets/images/register.png";

import classes from "./navigation.module.scss";

const Navigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, isAuthenticated } = useSelector(
    (state: StoreState) => state.user
  );
  const handleSignOut = () => {
    dispatch(logoutAction());
  };
  if (isAuthenticated) {
    // router.push(`/send-verify/`);
    history.push(`/send-verify/`);
    return (
      <Link
        to={{
          pathname: `/send-verify`,
        }}
      ></Link>
    );
    // return null;
  } else {
    return (
      <div className={classes.Navigation}>
        <div className={classes.NavigationWrapper}>
          <div className={classes.Logo}>
            <a href="/">
              <img src={LogoImg} alt="Logo" />
            </a>
          </div>

          <div className={classes.Routes}>
            <ul>
              <li>
                <Link to="/reservations">Reservations</Link>
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
          </div>

          <div className={classes.Profile}>
            <div className={classes.Notification}>
              <img src={NotificationImg} alt="Notification Bell" />
            </div>
            <div className={classes.Register}>
              <Link to="/register">
                <img className={classes.navBtn} src={register} alt="LoginPic" />
              </Link>
            </div>
            {currentUser !== null ? (
              <div className={classes.Logout} onClick={handleSignOut}>
                <Link to="/">
                  <img
                    className={classes.navBtn}
                    src={logout}
                    alt="LogoutPic"
                  />
                </Link>
              </div>
            ) : (
              <div className={classes.Login}>
                <Link to="/login">
                  <img className={classes.navBtn} src={user} alt="LoginPic" />
                </Link>
              </div>
            )}

            {/* <img src={ProfileImg} alt="Profile" /> */}
          </div>
        </div>
      </div>
    );
  }
};

export default Navigation;
