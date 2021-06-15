import React from "react";

import "./LegendSizeCircle.scss";

const LegendSizeCircle = () => {
  const sizes = [
    {
      radius: 5,
      population: 200,
    },
    {
      radius: 10,
      population: 2000,
    },
    {
      radius: 15,
      population: "20,000",
    },
  ];

  return (
    <>
      <div className="size-legend">
        <div className="size-legend-list">
          {sizes.map((size) => (
            <div className="size-legend-item" key={size.radius}>
              <span
                style={{ width: size.radius * 2, height: size.radius * 2 }}
                className="legend-circle"
              />
              <span className="size-population">{size.population}</span>
            </div>
          ))}
        </div>
        <p className="legend-text">Size by peak population</p>
      </div>
    </>
  );
};

export default LegendSizeCircle;
