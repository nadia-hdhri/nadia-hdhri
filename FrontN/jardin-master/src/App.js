
import "./App.css";
import Landing from "./pages/landing";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import { UserAuth } from "./hooks/auth";
import { Authcontext } from "./context/auth-context";

function App() {
  const { userId, token, login, logout } = UserAuth();

  let routes ;
  if (token) {
    routes = <Route path="/" exact component={Home} />;
  } else {
    routes = <Route path="/" exact component={Landing} />;
  }
  return (
    <Authcontext.Provider
      value={{ userId: userId, token: token, login: login, logout: logout }}
    >
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </Authcontext.Provider>
  );
}

export default App;
