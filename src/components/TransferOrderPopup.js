import React from "react";

import "./TransferOrderPopup.scss";

const TransferOrderPopup = ({ feature }) => {
  console.log(feature);
  const { properties } = feature;

  return (
    <div className="to-popup">
      <div className="popup-row">
        <span className="to-name">Transfer Order</span>
      </div>
      <div className="popup-row">
        <span className="to-meta">
          Number of people transferred: {properties.widthtest}
        </span>
      </div>
      <div className="to-row">
        <span className="to-meta">
          <span className="to-meta">
            Transfer date:
            {properties.month === 1
              ? " May 1942"
              : properties.month === 2
              ? " June 1942"
              : properties.month === 3
              ? " July 1942"
              : properties.month === 4
              ? " August 1942"
              : properties.month === 5
              ? " September 1942"
              : properties.month === 6
              ? " October 1942"
              : null}
          </span>
        </span>
      </div>
    </div>
  );
};

export default TransferOrderPopup;
