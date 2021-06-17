import React from "react";

import PopupHeader from "components/popups/PopupHeader";
import "./FARPopup.scss";

const FARPopup = ({ feature }) => {
  const { properties } = feature;

  return (
    <div className="far-popup">
      <PopupHeader className="far-location-name">
        {properties.city}, {properties.state}
      </PopupHeader>
      {properties.beforeCount ? (
        <div className="far-popup-row">
          {properties.beforeCount}
          <span> {properties.beforeCount === 1 ? "person" : "people"}</span>
          <span> lived here before entering the incarceration system</span>
        </div>
      ) : null}
      {properties.afterCount ? (
        <div className="far-popup-row">
          {properties.afterCount}
          <span> {properties.afterCount === 1 ? "person" : "people"}</span>
          <span> moved here after leaving the incarceration system</span>
        </div>
      ) : null}
    </div>
  );
};

export default FARPopup;
