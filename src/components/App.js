import React from "react";
import { Switch, Route } from "react-router-dom";

import About from "components/About";
import Index from "components/Index";
import Nav from "components/ui/Nav";
import IntroOverlay from "components/ui/IntroOverlay";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <IntroOverlay />
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
