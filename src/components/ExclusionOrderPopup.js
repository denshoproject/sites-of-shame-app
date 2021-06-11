import React from "react";

import "./ExclusionOrderPopup.scss";

const ExclusionOrderPopup = ({ feature }) => {
  const { properties } = feature;

  let imagesrc =
    "https://ddr.densho.org/media/sitesofshame/EO-C-" +
    properties.Name.slice(22) +
    ".png";

  let name = properties.Name.slice(6);

  return (
    <div className="eo-popup">
      <div className="popup-row">
        <div className="eo-title">
          <span className="eo-name">{name}</span>
        </div>
      </div>
      <div className="content-text">
        <div className="eo-row">
          <span className="eo-meta eo-details">
            <strong>Issued:</strong> {properties["Issue Date"]} <br></br>
            <strong>Effective: </strong>
            {properties["Effective Date"]} <br></br>
            <strong>Camp destination:</strong>{" "}
            {properties["WRA Camp Destination"]}
          </span>
        </div>
        <div className="eo-row">
          <span className="eo-meta">
            {properties["Number of people excluded"]} people excluded
          </span>
        </div>
        <div className="eo-row">
          <span className="eo-meta">
            <span className="eo-meta">{properties.description}</span>
          </span>
        </div>
      </div>
      <div className="content-image">
        <div className="eo-row">
          <span className="eo-meta">
            <img className="eo-image" src={imagesrc} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExclusionOrderPopup;
