import React, { PropsWithChildren } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { UserRole } from '../../API/interfaces';
import { ForbiddenPage } from '../../pages';

interface PrivateRoutePropsType extends RouteProps {
  condition: boolean
  redirectPath: string
  allowedRoles?: UserRole[]
  role?: UserRole
}

export const PrivateRoute = ({
  children,
  condition,
  redirectPath,
  allowedRoles,
  role,
  ...otherProps
}: PropsWithChildren<PrivateRoutePropsType>) => {
  if (!condition) {
    return (
      <Route {...otherProps}>
        <Redirect
          to={{
            pathname: redirectPath,
            state: {
              prevPath: otherProps.path,
            },
          }}
        />
      </Route>
    );
  }
  if (allowedRoles && !allowedRoles.includes(role!)) {
    return (
      <Route {...otherProps}>
        <ForbiddenPage />
      </Route>
    );
  }
  return (
    <Route {...otherProps}>
      {children}
    </Route>
  );
};
