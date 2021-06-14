import React from "react";

import "./LegendSizeCircle.scss";

const LegendSizeCircle = () => {
  return (
    <>
      <div className="size-legend">
        <span
          style={{ width: 10, height: 10, margin: 10 }}
          className="legend-circle"
        />
        <span
          style={{ width: 20, height: 20, margin: 10 }}
          className="legend-circle"
        />
        <span
          style={{ width: 30, height: 30, margin: 10 }}
          className="legend-circle"
        />
        <span
          style={{ width: 40, height: 40, margin: 10 }}
          className="legend-circle"
        />
        <p className="legend-text">Sized by peak population</p>
      </div>
    </>
  );
};

export default LegendSizeCircle;
