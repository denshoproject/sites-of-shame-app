import React from "react";

import "./FamilyPopup.scss";

const FamilyPopup = ({ feature }) => {
  const { properties } = feature;

  return (
    <div className="family-popup">
      <div className="popup-row">
        <span className="family-name">{properties.person_name}</span>
      </div>
      <div className="popup-row">
        <span className="family-meta">
          {/* <img alt="Image of Family Member" src={imagesrc} className="imgcrop" /> */}
        </span>
      </div>
      <div className="popup-row">
        <span className="family-meta">{properties.family_name}</span>
      </div>
      <div className="popup-row">
        <span className="family-meta">{properties.individualdescription}</span>
      </div>
      <div className="popup-row">
        <a
          target="_blank"
          rel="noreferrer"
          className="more-info"
          //  href={}
        >
          More Info
        </a>
      </div>
    </div>
  );
};

export default FamilyPopup;
