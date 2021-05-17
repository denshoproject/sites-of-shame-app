import React from "react";
import { Switch, Route } from "react-router-dom";

import Index from "../components/Index";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Index />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
