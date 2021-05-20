import { Route, BrowserRouter } from "react-router-dom";
import { UserAuth } from "./hooks/auth";
import { Authcontext } from "./context/auth-context";
import Components from "views/Components/Components.js";

import LoginPage from "views/LoginPage/LoginPage.js";
import React from "react";


function App() {
  const { userId, token, login, logout } = UserAuth();

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/login-page" component={LoginPage} />
        <Route path="/" exact component={Components} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        
        <Route path="/login-page" component={LoginPage} />
        
        <Route path="/" exact component={Components} />
      </React.Fragment>
    );
  }
  return (
    <Authcontext.Provider
      value={{ userId: userId, token: token, login: login, logout: logout }}
    >
      <BrowserRouter>{routes}</BrowserRouter>
    </Authcontext.Provider>
  );
}

export default App;
