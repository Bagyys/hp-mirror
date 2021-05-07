import { useDispatch, useStore } from "react-redux";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import { loadUser } from "../store/actions/userActions";
import { UserRoute } from "../components/PrivateRoute/PrivateRoute";
import Navigation from "../components/Navigation/navigation";
import Home from "./Home/home";
import Register from "../routes/Register/Register";
import SendVerify from "../routes/SendVerify/SendVerify";
import Verify from "../routes/Verify/Verify";
import Login from "../routes/Login/Login";
import FlatReview from "../routes/FlatReview/FlatView";
import Reservations from "../routes/Reservations/Reservations";

const Routes = () => {
  // const store = useStore(pageProps.initialReduxState);
  // const dispatch = useDispatch();

  // axios.defaults.headers.common["auth-token"] =
  //   typeof window !== "undefined" ? localStorage.getItem("token") : "";

  // dispatch(loadUser());

  return (
    <div>
      <Navigation />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/flat/:id" component={FlatReview} />
        <UserRoute path="/send-verify" component={SendVerify} />
        <Route path="/verify/:token" component={Verify} />
        <UserRoute path="/reservations" component={Reservations} />
      </Switch>
    </div>
  );
};

export default Routes;
