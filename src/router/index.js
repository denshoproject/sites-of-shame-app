import { BrowserRouter, HashRouter } from "react-router-dom";

/*
 * Get the router. By default this is a BrowserRouter, but since studio will
 * not work with browser routing, we allow HashRouter through an environment
 * variable.
 */
export const getRouter = () => {
  if (process.env.REACT_APP_ROUTER_MODE === "hash") {
    return HashRouter;
  } else {
    return BrowserRouter;
  }
};

export const Router = getRouter();
