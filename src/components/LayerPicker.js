import React, { useContext } from "react";
import classNames from "classnames";

import { Context } from "store";
import FARPicker from "components/FARPicker";
import LayerPickerSection from "components/LayerPickerSection";
import LegendCircle from "components/LegendCircle";
import "./LayerPicker.scss";

const LayerPicker = () => {
  const { state, dispatch } = useContext(Context);
  const layers = state.layers;

  const enabledLayers = layers
    .filter(({ enabled }) => enabled)
    .map(({ id }) => id);

  const toggleLayer = (id) => dispatch({ type: "toggle layer", layerId: id });
  const isEnabled = (id) => enabledLayers.indexOf(id) >= 0;

  return (
    <div className="layer-picker">
      <LayerPickerSection name="Journeys">
        <div className="layer-picker-subsection">
          <label>
            <input
              type="checkbox"
              checked={isEnabled("sos-journeys")}
              onChange={() => toggleLayer("sos-journeys")}
            />
            Family Journeys
          </label>
        </div>
        <div className="layer-picker-subsection">
          <label>
            <input
              type="checkbox"
              checked={isEnabled("far")}
              onChange={() => toggleLayer("far")}
            />
            Final Accountability Records
          </label>
          <FARPicker />
        </div>
        <div className="layer-picker-subsection">
          <label>
            <input
              type="checkbox"
              checked={isEnabled("transfer orders")}
              onChange={() => toggleLayer("transfer orders")}
            />
            Transfers between WRA camps
          </label>
        </div>
      </LayerPickerSection>
      <LayerPickerSection name="Facilities">
        <div className="layer-list">
          {layers.map((layer) => (
            <div
              key={layer.id}
              className={classNames({
                layer: true,
                enabled: layer.enabled,
              })}
            >
              {layer.layerLegend && layer.layerLegend.length ? (
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
      </LayerPickerSection>
    </div>
  );
};

export default LayerPicker;
