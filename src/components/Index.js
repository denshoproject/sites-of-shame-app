import React from "react";

import InsetMap from "components/InsetMap";
import MainMap from "components/MainMap";
import "./Index.scss";

const Index = () => {
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
