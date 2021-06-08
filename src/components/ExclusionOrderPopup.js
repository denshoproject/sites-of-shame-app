import React from "react";

import "./ExclusionOrderPopup.scss";

const ExclusionOrderPopup = ({ feature }) => {
  const { properties } = feature;

  const id = properties.Name.replace("SoS - Exclusion Order ", "");
  const imagesrc = `https://ddr.densho.org/media/sitesofshame/EO-C-${id}.png`;

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
            <img
              alt="First page of exclusion order document"
              src={imagesrc}
              style={{ width: "150px" }}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExclusionOrderPopup;
