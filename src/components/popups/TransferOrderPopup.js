import React from "react";
import dayjs from "dayjs";

import PopupHeader from "components/popups/PopupHeader";
import "./TransferOrderPopup.scss";

const TransferOrderPopup = ({ feature }) => {
  const { properties } = feature;

  const formatDate = (date) => dayjs(date).format("MMM YYYY");
  const firstDepartureFormatted = formatDate(properties.firstDeparture);
  const lastArrivalFormatted = formatDate(properties.lastArrival);

  return (
    <div className="to-popup">
      <PopupHeader className="to-name">
        From {properties.origin} to {properties.destination}
      </PopupHeader>
      <div className="popup-row">
        <span className="to-meta">
          {firstDepartureFormatted === lastArrivalFormatted ? (
            <span>In {firstDepartureFormatted}</span>
          ) : (
            <span>
              Between {firstDepartureFormatted} and {lastArrivalFormatted}
            </span>
          )}
        </span>
      </div>
      <div className="popup-row">
        <span className="to-meta">
          {properties.transferred} people transferred over{" "}
          {properties.transferCount} transfer orders
        </span>
      </div>
    </div>
  );
};

export default TransferOrderPopup;
