import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import { Router } from "router";

import Provider from "store";

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
