import React, { useState } from 'react'

import {
  BrowserRouter as Router, Switch, Redirect
} from 'react-router-dom';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {
  //hooks
  const [isAuth, setisAuth] = useState(true);

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute 
            path="/auth"
            component={AuthRouter}
            isAuthenticated={isAuth}
          />
          <PrivateRoute 
            exact
            path="/"
            component={JournalScreen}
            isAuthenticated={isAuth}
          />
          <Redirect to="/" />

        </Switch>
      </div>
    </Router>
  )
}
