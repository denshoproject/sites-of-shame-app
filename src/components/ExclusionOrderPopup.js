import React from "react";

import "./ExclusionOrderPopup.scss";

const ExclusionOrderPopup = ({ feature }) => {
  const { properties } = feature;

  const id = properties.Name.replace("SoS - Exclusion Order ", "");
  const imagesrc = `https://ddr.densho.org/media/sitesofshame/EO-C-${id}.png`;

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
          <img
            alt="First page of exclusion order document"
            src={imagesrc}
            style={{ width: "150px" }}
          />
        </span>
      </div>
    </div>
  );
};

export default ExclusionOrderPopup;
