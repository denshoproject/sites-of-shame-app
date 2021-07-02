import React from "react";

import "./ExclusionOrderLegend.scss";
import InfoboxButton from "components/ui/InfoboxButton";
import EoColor from "img/diagonal-grid.png";

const ExclusionOrderLegend = () => {
  return (
    <div className="eo-legend">
      <div className="eo-legend-content">
        <div className="legend-square">
          <img alt="Exclusion Order icon" src={EoColor} />
        </div>
        Exclusion Orders
        <InfoboxButton id={"Exclusion Orders"} clickedId={"Exclusion Orders"} />
      </div>
    </div>
  );
};

export default ExclusionOrderLegend;
