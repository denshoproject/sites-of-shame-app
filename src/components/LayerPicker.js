import React, { useContext } from "react";
import classNames from "classnames";

import { Context } from "store";
import FARPicker from "components/FARPicker";
import LegendCircle from "components/LegendCircle";
import "./LayerPicker.scss";

const LayerPicker = () => {
  const { state, dispatch } = useContext(Context);
  // const layers = state.layers.filter(({ inPicker }) => inPicker);
  const layers = state.layers;
  const handleClick = (layer) =>
    dispatch({ type: "toggle layer", layerId: layer.id });

  return (
    <div className="layer-picker">
      <div className="layer-list">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={classNames({
              layer: true,
              enabled: layer.enabled,
            })}
          >
            <div className="layer-name" onClick={() => handleClick(layer)}>
              {layer.name}
            </div>
            {layer.id === "final accountability records" && layer.enabled ? (
              <FARPicker />
            ) : null}
            {layer.layerLegend.length ? (
              <ol className="layer-legend-items">
                {layer.layerLegend.map((legend) => (
                  <li key={legend.color} className="layer-legend-item">
                    <LegendCircle color={legend.color} />
                    {legend.name}
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayerPicker;
