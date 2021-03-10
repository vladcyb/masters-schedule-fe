import React, { PropsWithChildren } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface PrivateRoutePropsType extends RouteProps {
  condition: boolean
  redirectPath: string
}

export const PrivateRoute = ({
  children,
  condition,
  redirectPath,
  ...otherProps
}: PropsWithChildren<PrivateRoutePropsType>) => (
  <Route {...otherProps}>
    {condition ? children : (
      <Redirect
        to={{
          pathname: redirectPath,
          state: {
            prevPath: otherProps.path,
          },
        }}
      />
    )}
  </Route>
);
