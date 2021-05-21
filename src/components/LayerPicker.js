import React, { useContext } from "react";
import classNames from "classnames";

import { Context } from "../store";
import "./LayerPicker.scss";
import FamilyDropdown from "./FamilyDropdown";

const LayerPicker = () => {
  const { state, dispatch } = useContext(Context);
  // const layers = state.layers.filter(({ inPicker }) => inPicker);
  const layers = state.layers;
  const handleClick = (layer) =>
    dispatch({ type: "toggle layer", layerId: layer.id });

  return (
    <div className="layer-picker">
      <FamilyDropdown />
      <div className="layer-list">
        <h4>Facilities</h4>
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={classNames({
              layer: true,
              enabled: layer.enabled,
            })}
            onClick={() => handleClick(layer)}
          >
            {layer.name}
            {layer.layerLegend.map((legend) => (
              <li key={legend.color} className="layer-legend-item">
                <span
                  style={{ backgroundColor: legend.color }}
                  className="color-circle"
                >
                  &nbsp;
                </span>
                {legend.name}
              </li>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayerPicker;
