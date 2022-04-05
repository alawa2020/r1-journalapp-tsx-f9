import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth'

import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { auth } from '../firebase/config'
import { useDispatch } from "react-redux";
import { doAuthSignIn } from "../state/actions/authActions";

export const AppRouter = () => {
  //hooks
  const [checking, setChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged( auth, ( user ) => {
      if( user?.uid ) {
        setIsAuth( true );
        dispatch( doAuthSignIn( user.uid, user.displayName || '' ) );
      } else {
        setIsAuth( false );
      }
      setChecking( false );
    })
  }, [ dispatch ])

  //others
  if( checking ) {
    return <h1>loading...</h1>
  }

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
  );
};
