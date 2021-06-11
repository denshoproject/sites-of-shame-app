import React from "react";

import "./FacilityPopup.scss";

const FacilityPopup = ({ feature }) => {
  const { properties } = feature;

  const imagesrc = `https://ddr.densho.org/media/sitesofshame/site-${properties.legacy_densho_id}.jpg`;

  return (
    <div className="facility-popup">
      <div className="popup-row">
        <span className="facility-meta">
          <img alt="Image of Facility" src={imagesrc} className="imgcrop" />
        </span>
      </div>
      <div className="popup-row">
        <div className="facility-title">
          <span className="facility-name">{properties.facility_name}</span>
        </div>
      </div>

      <div className="popup-row">
        <span className="facility-meta">
          {properties.sos_category}
          {properties.location_name ? (
            <span> in {properties.location_name}</span>
          ) : null}
        </span>
      </div>
      <div className="popup-row">
        <span className="facility-meta">
          {properties.date_opened && properties.date_closed ? (
            <span>
              Open from {properties.date_opened} to {properties.date_closed}
            </span>
          ) : null}
        </span>
      </div>
      <div className="popup-row">
        <span className="facility-meta">
          Peak population: {properties.peak_population}
          {properties.peak_popdate ? (
            <span> ({properties.peak_popdate})</span>
          ) : null}
        </span>
      </div>

      <div className="popup-row">{properties.location_description}</div>
      {properties.encyc_article_status ? (
        <div className="popup-row">
          Read more{" "}
          <a target="_blank" rel="noreferrer" href={properties.encyc_url}>
            in the Densho Encyclopedia
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default FacilityPopup;
