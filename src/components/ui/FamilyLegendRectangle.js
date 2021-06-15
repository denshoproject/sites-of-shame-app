import React from "react";

import "./FamilyLegendRectangle.scss";

const FamilyLegendRectangle = ({ color }) => {
  return (
    <span
      style={{ backgroundColor: color }}
      className="family-legend-rectangle"
    />
  );
};

export default FamilyLegendRectangle;
