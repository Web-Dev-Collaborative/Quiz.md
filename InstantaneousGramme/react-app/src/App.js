import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import Splash from "./components/SplashPage";
import Profile from './components/ProfilePage'
import DMs from './components/Messaging'
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import LandingPage from "./components/LandingPage";
import { useDispatch } from "react-redux";
import { restoreUser } from "./Store/session";

function App() {
  const dispatch = useDispatch()
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await dispatch(restoreUser())
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>

      <BrowserRouter>
        {authenticated && <NavBar setAuthenticated={setAuthenticated} />}

        <Switch>
          <Route path='/' exact={true}>
            {authenticated && <LandingPage />}
            {!authenticated && (
              <Splash
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            )}


          </Route>
          <ProtectedRoute path="/DM" exact={true} authenticated={authenticated}>
            <DMs />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/:id" exact={true} authenticated={authenticated}>
            <Profile />
          </ProtectedRoute>
          <Route path='/sign-up' exact={true}>
            <SignUpForm
              setAuthenticated={setAuthenticated}
            />
          </Route>
          <ProtectedRoute
            path='/users'
            exact={true}
            authenticated={authenticated}
          >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute
            path='/users/:userId'
            exact={true}
            authenticated={authenticated}
          >
            <User />
          </ProtectedRoute>
          <ProtectedRoute path='/' exact={true} authenticated={authenticated}>
            <h1>My Home Page</h1>
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
