import React from "react";

import "./TransferOrderPopup.scss";

const TransferOrderPopup = ({ feature }) => {
  console.log(feature);
  const { properties } = feature;

  return (
    <div className="to-popup">
      <div className="popup-row">
        <span className="to-name">
          Transfer Order #{properties["Transfer order number"]}
        </span>
      </div>
      <div className="to-row">
        <span className="to-meta">
          <span className="to-meta">
            <strong>Date of departure:</strong>{" "}
            {properties["Date of Departure"]}
          </span>
        </span>
      </div>
      <div className="to-row">
        <span className="to-meta">
          <span className="to-meta">
            <strong>Date of arrival:</strong> {properties["Date of Arrival"]}
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
