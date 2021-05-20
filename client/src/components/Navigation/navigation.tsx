import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { StoreState } from "../../store/configureStore";
import { loadUser, logoutAction } from "../../store/actions/userActions";
import NotificationImg from "../../assets/images/bell.png";
import LogoImg from "../../assets/images/Logo.png";
import userImg from "../../assets/images/user.png";
import logout from "../../assets/images/logout.png";
import register from "../../assets/images/register.png";

import classes from "./navigation.module.scss";
import { useEffect } from "react";

const Navigation = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated, user } = useSelector(
    (state: StoreState) => state.user
  );
  useEffect(() => {
    if (!user._id) {
      dispatch(loadUser());
    }
  }, []);

  useEffect(() => {}, [token, isAuthenticated]);

  const handleSignOut = () => {
    dispatch(logoutAction());
  };

  return (
    <div className={classes.Navigation}>
      <div className={classes.NavigationWrapper}>
        <div className={classes.Logo}>
          <Link to="/">
            <img src={LogoImg} alt="Logo" />
          </Link>
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
            <li>
              <Link to="/locks">Locks</Link>
            </li>
          </ul>
        </div>

        <div className={classes.Profile}>
          <div className={classes.Notification}>
            <img src={NotificationImg} alt="Notification Bell" />
          </div>

          {isAuthenticated && token ? (
            <>
              <div className={classes.Login}>
                <Link to="/settings">
                  <img
                    className={classes.navBtn}
                    src={userImg}
                    alt="ProfilePic"
                  />
                </Link>
              </div>
              <div className={classes.Logout} onClick={handleSignOut}>
                <Link to="/">
                  <img
                    className={classes.navBtn}
                    src={logout}
                    alt="LogoutPic"
                  />
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className={classes.Register}>
                <Link to="/register">
                  <img
                    className={classes.navBtn}
                    src={register}
                    alt="RegisterPic"
                  />
                </Link>
              </div>
              <div className={classes.Login}>
                <Link to="/login">
                  <img
                    className={classes.navBtn}
                    src={userImg}
                    alt="LoginPic"
                  />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
  // }
};

export default Navigation;
