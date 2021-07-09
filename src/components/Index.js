import React, { useContext, useEffect } from "react";
import * as d3 from "d3";

import { Context } from "store";
import InsetMap from "components/map/InsetMap";
import MainMap from "components/map/MainMap";
import "./Index.scss";
import ReactGA from "react-ga";

const Index = () => {
  const { dispatch } = useContext(Context);

  ReactGA.initialize("UA-1762741-15");

  useEffect(() => {
    d3.csv("./infoboxes.csv").then((data) => {
      dispatch({ type: "set infobox content", content: data });
    });
    ReactGA.pageview(window.location.pathname);
  }, [dispatch]);

  return (
    <div className="index">
      <div className="main-map-container">
        <MainMap />
      </div>
      <div className="inset-map-container">
        <InsetMap />
      </div>
    </div>
  );
};

export default Index;
