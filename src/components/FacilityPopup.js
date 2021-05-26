import React from "react";

import "./FacilityPopup.scss";

const FacilityPopup = ({ feature }) => {
  console.log(feature);
  const { properties } = feature;

  return (
    <div className="facility-popup">
      <div className="popup-row">
        <span className="facility-name">{properties.facility_name}</span>
      </div>
      <div className="popup-row">
        <span className="facility-meta">
          {properties.sos_category} in {properties.location_name}
        </span>
      </div>
      <div className="popup-row">
        <span className="facility-meta">
          Open from {properties.date_opened} to {properties.date_closed}
        </span>
      </div>
      <div className="popup-row">
        <span className="facility-meta">
          Peak population: {properties.peak_population} (
          {properties.peak_popdate})
        </span>
      </div>
      <div className="popup-row">{properties.location_description}</div>
      {properties.encyc_article_status ? (
        <div className="popup-row">
          Read more{" "}
          <a target="_blank" rel="noreferrer" href={properties.encyc_url}>
            on the Densho Encyclopedia
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default FacilityPopup;
