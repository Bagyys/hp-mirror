import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { StoreState } from "../../store/configureStore";

import Spinner from "../Spinner/Spinner";

interface Props {
  component: React.FC;
  path: string;
}
export const UserRoute: React.FC<Props> = ({ component, path, ...rest }) => {
  const { isLoading, isAuthenticated, token } = useSelector(
    (state: StoreState) => state.user
  );

  if (isLoading) {
    return <Spinner />;
  } else {
    return isAuthenticated && token ? (
      <Route exact path={path} component={component} {...rest} />
    ) : (
      <Redirect to={"/login"} />
    );
  }
};
