import React from "react";

import PopupHeader from "components/popups/PopupHeader";
import PopupImage from "components/popups/PopupImage";
import "./FacilityPopup.scss";

const FacilityPopup = ({ feature }) => {
  const { properties } = feature;

  const imagesrc = `https://ddr.densho.org/media/sitesofshame/site-${properties.legacy_densho_id}.jpg`;
  const imgCredit = properties.img_credit_line;
  const creditArray = imgCredit.includes("Accessed from")
    ? imgCredit.split("Accessed from: ")
    : [imgCredit];

  return (
    <div className="facility-popup">
      <PopupHeader className="facility-title">
        {properties.facility_name}
      </PopupHeader>
      <PopupImage alt={properties.facility_name} src={imagesrc} />
      <div className="image-credit">
        {creditArray[0]}{" "}
        {imgCredit.includes("Accessed from") ? "Accessed from:" : ""}{" "}
        <a href={creditArray[1]} className="credit-link">
          {creditArray[1]}
        </a>
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
              Active from {properties.date_opened} to {properties.date_closed}
            </span>
          ) : null}
        </span>
      </div>
      <div className="popup-row">
        <span className="facility-meta peak-population">Peak population:</span>{" "}
        <span>
          {properties.peak_population}
          {properties.peak_popdate ? (
            <span> ({properties.peak_popdate})</span>
          ) : null}
        </span>
      </div>

      <div className="popup-row">{properties.location_description}</div>
      {properties.encyc_article_status ? (
        <div className="popup-row">
          <a target="_blank" rel="noreferrer" href={properties.encyc_url}>
            More Info
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default FacilityPopup;
