import React, { useContext } from "react";

import { Context } from "store";
import FacilityCategoryPicker from "components/ui/FacilityCategoryPicker";
import FacilityTypePicker from "components/ui/FacilityTypePicker";
import LayerPickerSubsection from "components/ui/LayerPickerSubsection";
import LegendSizeCircle from "components/ui/LegendSizeCircle";
import "./FacilitiesPicker.scss";

const FacilitiesPicker = () => {
  const { state, dispatch } = useContext(Context);

  const { categories, enabledCategories } = state.facilities;

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
      {categories.map((category) => (
        <LayerPickerSubsection key={category.name}>
          <FacilityCategoryPicker
            name={category.name}
            enabled={enabledCategories.indexOf(category.name) >= 0}
            toggle={() => toggleCategory(category.name)}
          />
          <div className="layer-list">
            <ol className="layer-legend-items">
              {category.types.map((type) => (
                <li key={type.color} className="layer-legend-item">
                  <FacilityTypePicker
                    name={type.name}
                    color={type.color}
                    label={type.label}
                  />
                </li>
              ))}
            </ol>
          </div>
        </LayerPickerSubsection>
      ))}
      <LayerPickerSubsection>
        <LegendSizeCircle />
      </LayerPickerSubsection>
    </div>
  );
};

export default FacilitiesPicker;
