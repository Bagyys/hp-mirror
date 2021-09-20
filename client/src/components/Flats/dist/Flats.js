"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_media_hook_1 = require("react-media-hook");
var react_redux_1 = require("react-redux");
var sweetalert2_1 = require("sweetalert2");
var propertyActions_1 = require("../../store/actions/propertyActions");
var errorActions_1 = require("../../store/actions/errorActions");
var flats_module_scss_1 = require("./flats.module.scss");
var Pagination_1 = require("../Pagination/Pagination");
var userActions_1 = require("../../store/actions/userActions");
var joinClasses_1 = require("../../utilities/joinClasses");
var flatsFunctions_1 = require("../../utilities/flatsFunctions");
var filterActions_1 = require("../../store/actions/filterActions");
var FlatsNav_1 = require("./FlatsNav/FlatsNav");
var FlatsList_1 = require("./FlatsList/FlatsList");
var MyBookingsList_1 = require("./MyBookingsList/MyBookingsList");
var RecentlyViewedList_1 = require("./RecentlyViewedList/RecentlyViewedList");
var Flats = function (props) {
    var isMobile = react_media_hook_1.useMediaPredicate('(max-width: 675px)');
    var scrollRef = react_1.useRef(null);
    var dispatch = react_redux_1.useDispatch();
    var auth = react_redux_1.useSelector(function (state) { return state.user; });
    var user = auth.user;
    var propertyStore = react_redux_1.useSelector(function (state) { return state.property; });
    var quickViewPropertyId = propertyStore.quickViewPropertyId, myBookingQuickViewId = propertyStore.myBookingQuickViewId, pageSizeMain = propertyStore.pageSizeMain, currentPage = propertyStore.currentPage, pageSizeFavorite = propertyStore.pageSizeFavorite, properties = propertyStore.properties, recentlyViewedProperties = propertyStore.recentlyViewedProperties;
    var errorState = react_redux_1.useSelector(function (state) { return state.error; });
    var error = errorState.error;
    var propertiesList = react_1.useMemo(function () {
        return props.isMain ? properties : flatsFunctions_1.filterArrayById(properties, user.favorites);
    }, [props.isMain, user.favorites, properties]);
    react_1.useEffect(function () {
        dispatch(propertyActions_1.quickViewAction(''));
        dispatch(propertyActions_1.resetPropertyCordsAction());
    }, [currentPage, pageSizeMain]);
    react_1.useEffect(function () {
        dispatch(propertyActions_1.currentPageAction(1));
        dispatch(propertyActions_1.myBookingQuickViewAction(''));
    }, []);
    var handleError = function () {
        dispatch(errorActions_1.clearErrorAction());
    };
    react_1.useEffect(function () {
        if (error) {
            sweetalert2_1["default"].fire({
                title: error,
                text: 'Please try again',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonText: 'OK'
            }).then(function () {
                handleError();
            });
        }
    }, [error]);
    var favoritesHandler = function (id) {
        dispatch(userActions_1.addToFavoriteAction(id));
    };
    var quickViewHandler = function (id, cord) {
        var _a;
        props.isMain && dispatch(propertyActions_1.activePropertyCordsAction(cord));
        dispatch(propertyActions_1.quickViewAction(id));
        //pridedam apartamentus i recentlyViewed, kai padarom quick view ant apartamentu, ar reikia ieiti i apartamentus, kad tai atlikti ???
        dispatch(propertyActions_1.addRecentlyViewedAction(flatsFunctions_1.recentlyViewedObj(recentlyViewedProperties, id)));
        !props.isMain && ((_a = scrollRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' }));
    };
    var closeQuickViewHandler = function () {
        var _a;
        dispatch(propertyActions_1.quickViewAction(''));
        dispatch(propertyActions_1.resetPropertyCordsAction());
        !props.isMain && ((_a = scrollRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' }));
    };
    return (react_1["default"].createElement("div", { className: joinClasses_1.cn(flats_module_scss_1["default"].FlatsContainer, props.isMain
            ? flats_module_scss_1["default"].FlatsContainerMain
            : flats_module_scss_1["default"].FlatsContainerFavorite) },
        react_1["default"].createElement(FlatsNav_1["default"], { pageSize: pageSizeMain, numberOfApartaments: propertiesList === null || propertiesList === void 0 ? void 0 : propertiesList.length, isMain: props.isMain, filterOpen: function () { return dispatch(filterActions_1.toggleFilterButtonAction(true)); } }),
        !props.isMain && (react_1["default"].createElement(MyBookingsList_1["default"], { isMobile: isMobile, myBookingQuickViewId: myBookingQuickViewId, 
            //tiesiog isvedu vienus apartamentus test
            properties: properties.slice(0, 1) })),
        react_1["default"].createElement(FlatsList_1["default"], { properties: propertiesList, isMain: props.isMain, favorites: user.favorites, isMobile: isMobile, quickViewPropertyId: quickViewPropertyId, currentPage: currentPage, pageSizeMain: pageSizeMain, pageSizeFavorite: pageSizeFavorite, favoritesHandler: favoritesHandler, closeQuickViewHandler: closeQuickViewHandler, quickViewHandler: quickViewHandler, ref: scrollRef }),
        !isMobile && (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(Pagination_1["default"], { currentPage: currentPage, totalCount: (propertiesList === null || propertiesList === void 0 ? void 0 : propertiesList.length) -
                    (quickViewPropertyId === '' ||
                        pageSizeMain -
                            (pageSizeMain * currentPage - propertiesList.length) ===
                            1
                        ? 0
                        : 1), pageSize: props.isMain ? pageSizeMain : pageSizeFavorite, onPageChange: function (page) { return dispatch(propertyActions_1.currentPageAction(page)); } }),
            react_1["default"].createElement(RecentlyViewedList_1["default"], { properties: flatsFunctions_1.filterArrayById(properties, props.isMain
                    ? recentlyViewedProperties.main
                    : recentlyViewedProperties.favorite).reverse(), isMain: props.isMain, favorites: user.favorites, favoritesHandler: favoritesHandler, quickViewHandler: quickViewHandler })))));
};
exports["default"] = react_1["default"].memo(Flats);
