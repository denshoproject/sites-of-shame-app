import React from "react";

import "./LegendCircle.scss";

const LegendCircle = ({ color }) => {
  return <span style={{ backgroundColor: color }} className="legend-circle" />;
};

export default LegendCircle;
