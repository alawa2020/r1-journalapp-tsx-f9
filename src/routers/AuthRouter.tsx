import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import { SigninScreen } from '../components/auth/SigninScreen';
import { SignupScreen } from '../components/auth/SignupScreen';


export const AuthRouter = () => {
  return (
    <div>
      <Switch>
        <Route 
          exact 
          path="/auth/signin" 
          component={SigninScreen} 
        />

        <Route 
          exact 
          path="/auth/signup" 
          component={SignupScreen} 
        />

        <Redirect to="/auth/signin" />

      </Switch>
    </div>
  )
}
