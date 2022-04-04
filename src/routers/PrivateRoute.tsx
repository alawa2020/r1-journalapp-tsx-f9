import React, { FC } from 'react'
import { Redirect, Route } from 'react-router-dom'

interface Props {
  isAuthenticated: boolean;
  component: () => JSX.Element;
  path?: string;
  exact?: boolean;
}

export const PrivateRoute: FC<Props> = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route 
      {...rest}
      component={ (props: any) => (
        isAuthenticated
          ? <Component {...props} />
          : <Redirect to="/auth/signin" />
      )}
    />
  )
}
