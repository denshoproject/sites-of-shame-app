import React from "react";

import InfoboxButton from "components/ui/InfoboxButton";
import LegendCircle from "components/ui/LegendCircle";

const FacilityTypePicker = ({ label, name, color }) => {
  return (
    <div className="layer-legend-item-content">
      <LegendCircle color={color} />
      {label}
      <InfoboxButton id={name} clickedId={name} />
    </div>
  );
};

export default FacilityTypePicker;
