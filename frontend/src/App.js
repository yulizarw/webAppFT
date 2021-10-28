import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
} from "react-router-dom";

// account page
import { Login } from "./screen/login"
// import { Home } from "./screen/home"
import {UserRegister} from "./screen/userRegister"

//router guard
import ProtectedRoute from "./helper/ProtectedRoute";
import LoginProtectedRoute from "./helper/LoginProtectedRoute";

//screen
import {Home} from './screen/home'


import { Provider, useSelector } from "react-redux";
import store from "./store/index";

function App() {
  const [authLogin, setAuthLogin] = useState(false);
  const loginFunction = () => {
    setAuthLogin(true);
  };
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <LoginProtectedRoute exact path="/" authLogin={authLogin}>
            <Login loginFunction={loginFunction} />
          </LoginProtectedRoute>
          <Route exact path ="/register">
            <UserRegister />
          </Route>
          <ProtectedRoute
            exact
            path="/home"
            authLogin={authLogin}
            component={Home}
          />
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
