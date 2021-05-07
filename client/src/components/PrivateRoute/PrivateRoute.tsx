import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { StoreState } from "../../store/configureStore";

interface Props {
  component: React.FC;
  path: string;
}
export const UserRoute: React.FC<Props> = ({ component, path, ...rest }) => {
  const { isAuthenticated, token } = useSelector(
    (state: StoreState) => state.user
  );

  return isAuthenticated && token ? (
    <Route exact path={path} component={component} {...rest} />
  ) : (
    <Redirect to={"/login"} />
  );
};
