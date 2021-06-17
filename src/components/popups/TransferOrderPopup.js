import React from "react";

import PopupHeader from "components/popups/PopupHeader";
import "./TransferOrderPopup.scss";

const TransferOrderPopup = ({ feature }) => {
  const { properties } = feature;

  return (
    <div className="to-popup">
      <PopupHeader className="to-name">
        Transfer Order #{properties["Transfer order number"]}
      </PopupHeader>
      <div className="to-row">
        <span className="to-meta">
          <span className="to-meta">
            <span className="bold-text">Date of departure:</span>{" "}
            {properties["Date of Departure"]}
          </span>
        </span>
      </div>
      <div className="to-row">
        <span className="to-meta">
          <span className="to-meta">
            <span className="bold-text">Date of arrival:</span>{" "}
            {properties["Date of Arrival"]}
          </span>
        </span>
      </div>
      <div className="to-row">
        <span className="to-meta">
          <span className="to-meta">
            From {properties["Assembly Center origin"]} to{" "}
            {properties["Relocation Center destination"]}
          </span>
        </span>
      </div>

      <div className="popup-row">
        <span className="to-meta">
          {properties["Persons transferred"]} people transferred
        </span>
      </div>
    </div>
  );
};

export default TransferOrderPopup;
