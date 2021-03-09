import React, { PropsWithChildren } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface PrivateRoutePropsType extends RouteProps {
  condition: boolean
  redirectPath: string
}

export const PrivateRoute = (props: PropsWithChildren<PrivateRoutePropsType>) => {
  /* props */
  const {
    children,
    condition,
    redirectPath,
    ...otherProps
  } = props;

  return (
    <Route {...otherProps}>
      {condition ? children : <Redirect to={redirectPath} />}
    </Route>
  );
};
