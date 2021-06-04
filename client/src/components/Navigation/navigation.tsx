import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { StoreState } from "../../store/configureStore";
import { userState } from "../../store/reducers/userReducer";
// import { errorState } from "../../store/reducers/errorReducer";
import { loadUser, logoutAction } from "../../store/actions/userActions";
import NotificationImg from "../../assets/images/bell.png";
import BurgerMenu from "../../assets/images/menu.png";
import LogoImg from "../../assets/images/Logo.png";
import userImg from "../../assets/images/user.png";
import logout from "../../assets/images/logout.png";
import register from "../../assets/images/register.png";
import NavRoutes from "./NavRoutes/NavRoutes";
import Backdrop from "../Backdrop/Backdrop";

import classes from "./navigation.module.scss";

const Navigation = () => {
  const dispatch = useDispatch();
  const auth: userState = useSelector((state: StoreState) => state.user);
  // const errorState: errorState = useSelector(
  //   (state: StoreState) => state.error
  // );
  // const { error } = errorState;
  const { token, isAuthenticated, user } = auth;
  useEffect(() => {
    if (!user._id) {
      dispatch(loadUser());
    }
  }, []);

  useEffect(() => {}, [token, isAuthenticated]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSignOut = () => {
    dispatch(logoutAction());
  };

  const openMobileMenu = () => {
    setIsOpen(true);
  };
  const closeMobileMenu = () => {
    setIsOpen(false);
  };
  return (
    <div className={classes.Navigation}>
      <div className={classes.NavigationWrapper}>
        <div className={classes.Left}>
          <div className={classes.Logo}>
            <Link to="/">
              <img src={LogoImg} alt="Logo" />
            </Link>
          </div>
          <NavRoutes />
        </div>
        <div className={classes.Right}>
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
            <div className={classes.Menu}>
              <img src={BurgerMenu} alt="Menu" onClick={openMobileMenu} />

              <Backdrop isVisible={isOpen} toggleHandler={closeMobileMenu}>
                <div className={classes.Close} onClick={closeMobileMenu}>
                  X
                </div>
                <Link
                  className={classes.MobileLink}
                  onClick={closeMobileMenu}
                  to="/reservations"
                >
                  Reservations
                </Link>
                <Link
                  className={classes.MobileLink}
                  onClick={closeMobileMenu}
                  to="/favorites"
                >
                  Favorites
                </Link>
                <Link
                  className={classes.MobileLink}
                  onClick={closeMobileMenu}
                  to="/history"
                >
                  History
                </Link>
                <Link
                  className={classes.MobileLink}
                  onClick={closeMobileMenu}
                  to="/settings"
                >
                  Settings
                </Link>
                <Link
                  className={classes.MobileLink}
                  onClick={closeMobileMenu}
                  to="/locks"
                >
                  Locks
                </Link>
              </Backdrop>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
