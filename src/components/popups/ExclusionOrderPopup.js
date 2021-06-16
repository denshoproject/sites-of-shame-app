import React from "react";

import "./ExclusionOrderPopup.scss";

const ExclusionOrderPopup = ({ feature }) => {
  const { properties } = feature;

  const id = properties.Name.replace("SoS - Exclusion Order ", "");
  const imagesrc = `https://ddr.densho.org/media/sitesofshame/EO-C-${id}.png`;
  const pdflink = `https://ddr.densho.org/media/sitesofshame/EO-${id}.pdf`;

  let name = properties.Name.replace("SoS - ", "");

  return (
    <div className="eo-popup">
      <div className="popup-row">
        <div className="eo-title">
          <span className="eo-name">{name}</span>
        </div>
      </div>
      <div className="eo-row">
        <span className="eo-meta">
          <div className="img-container">
            <img
              alt="First page of exclusion order document"
              src={imagesrc}
              className="imgcrop"
            />
          </div>
        </span>
      </div>
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
      <div className="eo-row">
        <a
          target="_blank"
          rel="noreferrer"
          className="view-full-image"
          href={pdflink}
        >
          View full Exclusion Order
        </a>
      </div>
    </div>
  );
};

export default ExclusionOrderPopup;
