import React from "react";

import "./ExclusionOrderPopup.scss";

const ExclusionOrderPopup = ({ feature }) => {
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
      <div className="eo-row">
        <span className="eo-meta">
          Issued {properties["Issue Date"]}, Effective{" "}
          {properties["Effective Date"]}
        </span>
      </div>
      <div className="eo-row">
        <span className="eo-meta">
          {properties["Number of people excluded"]} people excluded
        </span>
      </div>
      <div className="eo-row">
        <span className="eo-meta">
          Camp destination: {properties["WRA Camp Destination"]}
        </span>
      </div>
      <div className="eo-row">
        <span className="eo-meta">
          <img src="https://media.densho.org/sitesofshame/EO-.pdf" />
          {properties.Name.slice(21)}
        </span>
      </div>
    </div>
  );
};

export default ExclusionOrderPopup;
