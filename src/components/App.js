import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact>
            <div>Home</div>
          </Route>
          <Route path="/about">
            <div>About</div>
          </Route>
        </Switch>
      </header>
    </div>
  );
};

export default App;
