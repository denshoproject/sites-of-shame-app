import React from "react";

import PopupHeader from "components/popups/PopupHeader";
import "./FamilyPopup.scss";

const FamilyPopup = ({ feature }) => {
  const { properties } = feature;

  return (
    <div className="family-popup">
      <PopupHeader className="family-name">
        {properties.person_name}
      </PopupHeader>
      <div className="popup-row">
        {properties.image_url ? (
          <span className="family-meta">
            <img
              alt={properties.person_name}
              src={properties.image_url}
              className="imgcrop"
            />
          </span>
        ) : null}
      </div>
      <div className="popup-row">
        <span className="family-meta">{properties.family_name} family</span>
      </div>
      <div className="popup-row">
        {properties.individual_description ? (
          <span className="family-meta">
            {properties.individual_description}
          </span>
        ) : null}
      </div>
      <div className="popup-row">
        {properties.more_info_url ? (
          <div className="popup-row">
            <a
              target="_blank"
              rel="noreferrer"
              className="learn-more"
              href={properties.more_info_url}
            >
              Learn more
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FamilyPopup;
