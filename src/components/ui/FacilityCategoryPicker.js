import React from "react";

import InfoboxButton from "components/ui/InfoboxButton";

const FacilityCategoryPicker = ({ name, enabled, toggle }) => {
  return (
    <div className="facilities-category-name">
      <div className="facilities-category-name-content">
        <label>
          <input type="checkbox" checked={enabled} onChange={toggle} />
          {name}
        </label>
        <InfoboxButton id={name} clickedId={name} />
      </div>
    </div>
  );
};

export default FacilityCategoryPicker;
