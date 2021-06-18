import React from "react";

import PopupHeader from "components/popups/PopupHeader";
import "./TransferOrderPopup.scss";

const TransferOrderPopup = ({ feature }) => {
  const { properties } = feature;

  return (
    <div className="to-popup">
      <PopupHeader className="to-name">
        Transfer Order #{properties["transfernumber"]}
      </PopupHeader>
      <div className="to-row">
        <span className="to-meta">
          <span className="to-meta">
            From {properties.origin} to {properties.destination}
          </span>
        </span>
      </div>

      <div className="popup-row">
        <span className="to-meta">
          {properties.transferred} people transferred
        </span>
      </div>
    </div>
  );
};

export default TransferOrderPopup;
