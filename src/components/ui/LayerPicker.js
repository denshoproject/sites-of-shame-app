import React, { useContext } from "react";

import { Context } from "store";
import FARPicker from "components/ui/FARPicker";
import FamilyPicker from "components/ui/FamilyPicker";
import FacilitiesPicker from "components/ui/FacilitiesPicker";
import InfoboxButton from "components/ui/InfoboxButton";
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
          <div className="subsection-header">
            <label>
              <input
                type="checkbox"
                checked={isEnabled("families")}
                onChange={() => {
                  if (isEnabled("families")) clearSelectedFamily();
                  toggleLayer("families");
                }}
              />
              Family Journeys
            </label>
            <InfoboxButton id="Family Journeys" clickedId="Family Journeys" />
          </div>
          <FamilyPicker />
        </LayerPickerSubsection>
        <LayerPickerSubsection>
          <div className="subsection-header">
            <label>
              <input
                type="checkbox"
                checked={isEnabled("far")}
                onChange={() => toggleLayer("far")}
              />
              Location Before and After Camp
            </label>
            <InfoboxButton
              id="Location Before and After Camp"
              clickedId="Location Before and After Camp"
            />
          </div>
          <FARPicker />
        </LayerPickerSubsection>
        <LayerPickerSubsection>
          <div className="subsection-header">
            <label>
              <input
                type="checkbox"
                checked={isEnabled("transfer orders")}
                onChange={() => toggleLayer("transfer orders")}
              />
              From Assembly Center to Camp
            </label>
            <InfoboxButton
              id="From Assembly Centers to Camps"
              clickedId="From Assembly Centers to Camps"
            />
          </div>
        </LayerPickerSubsection>
      </LayerPickerSection>
      <LayerPickerSection name="Facilities">
        <FacilitiesPicker />
      </LayerPickerSection>
    </div>
  );
};

export default LayerPicker;
