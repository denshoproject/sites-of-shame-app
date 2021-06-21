import React from "react";
import dayjs from "dayjs";

import PopupHeader from "components/popups/PopupHeader";
import "./FamilyPopup.scss";

const FamilyPointPopup = ({ feature }) => {
  const { properties } = feature;
  const individuals = JSON.parse(properties.locationIndividuals);

  return (
    <div className="family-popup">
      <PopupHeader className="family-name">{properties.location}</PopupHeader>
      {properties.image_url ? (
        <div className="popup-row">
          <span className="family-meta">
            <img
              alt={properties.person_name}
              src={properties.image_url}
              className="imgcrop"
            />
          </span>
        </div>
      ) : null}
      {properties.locationCount ? (
        <div className="popup-row">
          {properties.locationCount}
          <span> {properties.locationCount === 1 ? "member" : "members"} </span>
          of the {properties.family_name} family
          <span> {properties.locationCount === 1 ? "was" : "were"} </span>
          here:
        </div>
      ) : null}
      {individuals ? (
        <div className="popup-row">
          <ul>
            {individuals.map((individual) => (
              <li key={individual.name}>
                {individual.name} ({dayjs(individual.date).format("MMM YYYY")})
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="popup-row">
        {properties.more_info_url ? (
          <div className="popup-row">
            <a target="_blank" rel="noreferrer" href={properties.more_info_url}>
              Learn more
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FamilyPointPopup;
