import React, { useContext, useEffect } from "react";
import * as d3 from "d3";

import { Context } from "store";
import InsetMap from "components/InsetMap";
import MainMap from "components/MainMap";
import "./Index.scss";

const Index = () => {
  const { dispatch } = useContext(Context);

  useEffect(() => {
    d3.csv("./infoboxes.csv").then((data) => {
      dispatch({ type: "set infobox content", content: data });
    });
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
