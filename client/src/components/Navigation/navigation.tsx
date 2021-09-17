import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaPredicate } from "react-media-hook";
import { Link } from "react-router-dom";
import { cn } from "../../utilities/joinClasses";
import { StoreState } from "../../store/configureStore";
import { userState } from "../../store/reducers/userReducer";
import SearchBox from "./SearchBox/SearchBox";
import Language from "./Language/Language";
// import { ErrorState } from '../../store/reducers/errorReducer';
import {
  loadUser,
  logoutAction,
  toggleNavMenuButtonAction,
  pageScrollAction,
} from "../../store/actions/userActions";
import favoritePc from "../../assets/images/favorite.svg";
import favoritePcActive from "../../assets/images/favorite_yellow.png";
import GuideImg from "../../assets/images/guide.svg";
import LogoImg from "../../assets/images/logo.svg";
import UserPic from "../../assets/images/user_picture.svg";
import classes from "./navigation.module.scss";
import Button from "../../routes/components/Button/button";
import { PropertyState } from "../../store/reducers/propertyReducer";
import { FilterState } from "../../store/reducers/filterReducer";
const Navigation = () => {
  const dispatch = useDispatch();
  const auth: userState = useSelector((state: StoreState) => state.user);
  const properties: PropertyState = useSelector(
    (state: StoreState) => state.property
  );
  const filterSide: FilterState = useSelector(
    (state: StoreState) => state.filter
  );
  const { isFilterOpen } = filterSide;
  const { quickViewPropertyId } = properties;
  // const errorState: ErrorState = useSelector(
  //   (state: StoreState) => state.error
  // );
  // const { error } = errorState;
  const { token, isAuthenticated, user, isNavMenuOpened, isPageScrolled } =
    auth;
  const isMobile = useMediaPredicate("(max-width: 675px)");
  const wrapperRef = useRef<HTMLDivElement>(null); //Nav menu, close then click outside

  /*Nav visibility on mobile, then click on quickview property and scroll*/
  const navMobileRef = useRef<boolean>();
  navMobileRef.current = isPageScrolled;

  useEffect(() => {
    if (user && !user._id) {
      dispatch(loadUser());
    }
    dispatch(toggleNavMenuButtonAction(false));
  }, []);

  useEffect(() => {}, [token, isAuthenticated]);

  //Nav menu, close then click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        isNavMenuOpened
      ) {
        dispatch(toggleNavMenuButtonAction(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNavMenuOpened]);

  //Nav visibility on mobile, then click on quickview property and scroll
  useEffect(() => {
    if (quickViewPropertyId && isMobile) {
      const handleScroll = () => {
        const show = window.scrollY > 0;
        if (navMobileRef.current !== show) {
          dispatch(pageScrollAction(show));
        }
      };
      document.addEventListener("scroll", handleScroll);
      return () => {
        document.removeEventListener("scroll", handleScroll);
      };
    }
  }, [quickViewPropertyId]);
  const handleSignOut = () => {
    dispatch(toggleNavMenuButtonAction(false));
    dispatch(logoutAction());
  };
  const menuHandler = () => {
    dispatch(toggleNavMenuButtonAction(!isNavMenuOpened));
  };

  return (
    <div
      className={cn(
        classes.Navigation,
        quickViewPropertyId && !isPageScrolled && !isFilterOpen
          ? classes.HideNav
          : ""
      )}
    >
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
          {/* <SearchType /> */}
        </div>
        <div className={classes.Right}>
          <div className={classes.Favorite}>
            <Link to="/favorites">
              {user.favorites.length ? (
                <Button btnType="PcFavoriteNavActive" bgColor="Grey">
                  <img src={favoritePcActive} alt="favorite" />
                  <p>{user.favorites.length}</p>
                </Button>
              ) : (
                <Button btnType="PcFavoriteNav">
                  <img src={favoritePc} alt="favorite"  />
                </Button>
              )}
            </Link>
          </div>
          <div className={classes.Guide}>
            <img src={GuideImg} alt="Favorites" />
            <p>City Guide</p>
          </div>
          {/* {isAuthenticated && token ? (
            <> */}
          <div ref={wrapperRef} className={classes.NavMenuBtn}>
            <div onClick={menuHandler} className={classes.Slider}>
              <div className={classes.Burger}></div>
              <div
                className={cn(
                  classes.SliderItem,
                  isNavMenuOpened ? classes.SlideOpen : ""
                )}
              >
                {isAuthenticated && token && (
                  <img src={UserPic} alt="Profile picture" />
                )}
              </div>
            </div>
            {isNavMenuOpened && (
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
