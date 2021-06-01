import React from "react";
import dayjs from "dayjs";

import "./FARPopup.scss";

const FARPopup = ({ feature }) => {
  const { properties } = feature;
  const finalDepartureDate = dayjs(properties.date_of_final_departure);

  return (
    <div className="far-popup">
      <div className="far-popup-row">
        Origin: {properties.pre_city}, {properties.pre_state}
      </div>
      <div className="far-popup-row">
        Destination: {properties.dest_city}, {properties.dest_state}
      </div>
      <div className="far-popup-row">
        Final departure: {finalDepartureDate.format("MMM D, YYYY")}
      </div>
    </div>
  );
};

export default FARPopup;
