import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cn } from "../../utilities/joinClasses";
import { StoreState } from "../../store/configureStore";
import { userState } from "../../store/reducers/userReducer";
import SearchBox from "./SearchBox/SearchBox";
import Language from "./Language/Language";
// import { ErrorState } from '../../store/reducers/errorReducer';
import { loadUser, logoutAction } from "../../store/actions/userActions";
import favoritePc from "../../assets/images/Favorite.svg";
import favoritePcActive from "../../assets/images/favorite_yellow.png";
import GuideImg from "../../assets/images/Guide.svg";
import LogoImg from "../../assets/images/Logo.svg";
import UserPic from "../../assets/images/UserPicture.svg";
import NavRoutes from "./NavRoutes/NavRoutes";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./navigation.module.scss";
import Button from "../Button/button";

const Navigation = () => {
  const [sliderToggle, setSliderToggle] = useState<boolean>(false);

  const dispatch = useDispatch();
  const auth: userState = useSelector((state: StoreState) => state.user);

  // const errorState: ErrorState = useSelector(
  //   (state: StoreState) => state.error
  // );
  // const { error } = errorState;
  const { token, isAuthenticated, user } = auth;
  useEffect(() => {
    if (user && !user._id) {
      dispatch(loadUser());
    }
  }, []);

  useEffect(() => {}, [token, isAuthenticated]);

  const handleSignOut = () => {
    setSliderToggle(false);
    dispatch(logoutAction());
  };
  const menuHandler = () => {
    setSliderToggle(!sliderToggle);
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
          {/* <NavRoutes /> */}
        </div>
        <div className={classes.Middle}>
          <div>Anytime</div>
          <SearchBox />
        </div>
        <div className={classes.Right}>
          <div className={classes.Favorite}>
            <Button btnType="FavoriteNav">
              {user?.favorites.length > 0 ? (
                <React.Fragment>
                  <img src={favoritePcActive} alt="favorite" />
                  <p>{user.favorites.length}</p>
                </React.Fragment>
              ) : (
                <img src={favoritePc} alt="favorite" />
              )}
            </Button>
          </div>
          <div className={classes.Guide}>
            <img src={GuideImg} alt="Favorites" />
            <p>City Guide</p>
          </div>
          {/* {isAuthenticated && token ? (
            <> */}
          <div className={classes.NavMenuBtn}>
            <div onClick={menuHandler} className={classes.Slider}>
              <div className={classes.Burger}></div>
              <div
                className={cn(
                  classes.SliderItem,
                  sliderToggle ? classes.SlideOpen : ""
                )}
              >
                {isAuthenticated && token && (
                  <img src={UserPic} alt="Profile picture" />
                )}
              </div>
            </div>
            {sliderToggle && (
              <div className={classes.MenuContainer}>
                {isAuthenticated && token ? (
                  <div onClick={handleSignOut}>
                    <Link to="/">Logout</Link>
                  </div>
                ) : (
                  <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Sign Up</Link>
                  </div>
                )}
                <div className={classes.HostHome}>
                  <Link to="#">Host your home</Link>
                </div>
                <div>
                  <Link to="#">About us</Link>
                  <Link to="#">Contacts</Link>
                </div>
              </div>
            )}
          </div>
          <Language />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
