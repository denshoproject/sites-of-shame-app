import React from "react";

import "./ExclusionOrderPopup.scss";

const ExclusionOrderPopup = ({ feature }) => {
  const { properties } = feature;

  let imagesrc =
    "https://ddr.densho.org/media/sitesofshame/EO-C-" +
    properties.Name.slice(22) +
    ".png";

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
          <img src={imagesrc} style={{ width: "150px" }} />
        </span>
      </div>
    </div>
  );
};

export default ExclusionOrderPopup;
