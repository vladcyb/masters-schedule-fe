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
    ...rest
  } = props;

  return (
    <Route {...rest}>
      {condition ? children : <Redirect to={redirectPath} />}
    </Route>
  );
};
