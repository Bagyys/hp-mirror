import { Route, Switch } from 'react-router-dom';

import { UserRoute } from '../components/PrivateRoute/PrivateRoute';
import Home from './Home/home';
import Register from '../routes/Register/Register';
import SendVerify from '../routes/SendVerify/SendVerify';
import Verify from '../routes/Verify/Verify';
import Login from '../routes/Login/Login';
import FlatReview from '../routes/FlatReview/FlatView';
import Reservations from '../routes/Reservations/Reservations';
import History from '../routes/History/History';
import Settings from '../routes/Settings/Settings';
import Locks from '../routes/Locks/Locks';
const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/flat/:id" component={FlatReview} />
      <Route path="/verify/:token" component={Verify} />
      <UserRoute path="/send-verify" component={SendVerify} />
      <UserRoute path="/history" component={History} />
      <UserRoute path="/reservations" component={Reservations} />
      <UserRoute path="/settings" component={() => <Settings />} />
      <UserRoute path="/locks" component={Locks} />
    </Switch>
  );
};
export default Routes;
