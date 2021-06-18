import React from "react";
import { Switch, Route } from "react-router-dom";

import About from "components/About";
import Index from "components/Index";
import Nav from "components/ui/Nav";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Index />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
