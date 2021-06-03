import React from "react";

import InsetMap from "components/InsetMap";
import MainMap from "components/MainMap";
import Timeline from "components/Timeline";
import "./Index.scss";

const Index = () => {
  return (
    <div className="index">
      <div className="map-section">
        <div className="main-map-container">
          <MainMap />
        </div>
        <div className="inset-map-container">
          <InsetMap />
        </div>
      </div>
      <div className="timeline-container">
        <Timeline />
      </div>
    </div>
  );
};

export default Index;
