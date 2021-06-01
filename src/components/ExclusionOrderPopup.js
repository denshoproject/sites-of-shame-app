import React from "react";

import "./ExclusionOrderPopup.scss";

const ExclusionOrderPopup = ({ feature }) => {
  console.log(feature);
  const { properties } = feature;

  return (
    <div className="eo-popup">
      <div className="popup-row">
        <span className="eo-name">{properties.Name}</span>
      </div>
      <div className="eo-row">
        <span className="eo-meta">
          <span className="eo-meta">{properties.description}</span>
        </span>
      </div>
    </div>
  );
};

export default ExclusionOrderPopup;
