import React, { useContext } from "react";

import { Context } from "store";
import FARPicker from "components/ui/FARPicker";
import FamilyPicker from "components/ui/FamilyPicker";
import FacilitiesPicker from "components/ui/FacilitiesPicker";
import LayerPickerSection from "components/ui/LayerPickerSection";
import LayerPickerSubsection from "components/ui/LayerPickerSubsection";
import "./LayerPicker.scss";

const LayerPicker = () => {
  const { state, dispatch } = useContext(Context);
  const layers = state.layers;

  const enabledLayers = layers
    .filter(({ enabled }) => enabled)
    .map(({ id }) => id);

  const toggleLayer = (id) => dispatch({ type: "toggle layer", layerId: id });
  const isEnabled = (id) => enabledLayers.indexOf(id) >= 0;

  const clearSelectedFamily = () =>
    dispatch({
      type: "set family selectedFamily",
      selectedFamily: "",
    });

  return (
    <div className="layer-picker">
      <LayerPickerSection name="Journeys">
        <LayerPickerSubsection>
          <label className="labeltext">
            <input
              className="checkbox"
              type="checkbox"
              checked={isEnabled("families")}
              onChange={() => {
                if (isEnabled("families")) clearSelectedFamily();
                toggleLayer("families");
              }}
            />
            Family Journeys
          </label>
          <FamilyPicker />
        </LayerPickerSubsection>
        <LayerPickerSubsection>
          <label className="labeltext">
            <input
              className="checkbox"
              type="checkbox"
              checked={isEnabled("far")}
              onChange={() => toggleLayer("far")}
            />
            Location Before and After Camp
          </label>
          <FARPicker />
        </LayerPickerSubsection>
        <LayerPickerSubsection>
          <label className="labeltext">
            <input
              className="checkbox"
              type="checkbox"
              checked={isEnabled("transfer orders")}
              onChange={() => toggleLayer("transfer orders")}
            />
            Transfers between WRA camps
          </label>
        </LayerPickerSubsection>
      </LayerPickerSection>
      <LayerPickerSection name="Facilities">
        <FacilitiesPicker />
      </LayerPickerSection>
    </div>
  );
};

export default LayerPicker;
