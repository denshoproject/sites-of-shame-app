import React from "react";

import MainMap from "components/MainMap";
import "./Index.scss";

const Index = () => {
  return (
    <div className="index">
      <div className="main-map-container">
        <MainMap />
      </div>
    </div>
  );
};

export default Index;
