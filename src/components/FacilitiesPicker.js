import React, { useContext } from "react";

import { Context } from "store";
import LayerPickerSubsection from "components/LayerPickerSubsection";
import LegendCircle from "components/LegendCircle";
import "./FacilitiesPicker.scss";

const FacilitiesPicker = () => {
  const { state, dispatch } = useContext(Context);
  const layer = state.layers.filter(({ id }) => id === "sos-facilities")[0];

  const { enabledCategories } = state.facilities;

  const toggleCategory = (name) => {
    let newCategories;
    if (enabledCategories.indexOf(name) >= 0) {
      newCategories = enabledCategories.filter((c) => c !== name);
    } else {
      newCategories = [...enabledCategories, name];
    }
    dispatch({
      type: "set facilities enabledCategories",
      categories: newCategories,
    });
  };

  return (
    <div className="facilities-picker">
      {layer.categories.map((category) => (
        <LayerPickerSubsection>
          <div>
            <label>
              <input
                type="checkbox"
                checked={enabledCategories.indexOf(category.name) >= 0}
                onChange={() => toggleCategory(category.name)}
              />
              {category.name}
            </label>
          </div>
          <div className="layer-list">
            <ol className="layer-legend-items">
              {category.types.map((type) => (
                <li key={type.color} className="layer-legend-item">
                  <LegendCircle color={type.color} />
                  {type.name}
                </li>
              ))}
            </ol>
          </div>
        </LayerPickerSubsection>
      ))}
    </div>
  );
};

export default FacilitiesPicker;
