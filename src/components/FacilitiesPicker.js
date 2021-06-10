import React, { useContext } from "react";

import { Context } from "store";
import Infobox from "components/Infobox";
import InfoboxButton from "components/InfoboxButton";
import LayerPickerSubsection from "components/LayerPickerSubsection";
import LegendCircle from "components/LegendCircle";
import "./FacilitiesPicker.scss";

const FacilitiesPicker = () => {
  const { state, dispatch } = useContext(Context);
  const layer = state.layers.filter(({ id }) => id === "sos-facilities")[0];

  const { clickedId } = state.infobox;
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
          <div className="facilities-category-name">
            {clickedId === category.name ? (
              <Infobox id={category.name} />
            ) : null}
            <div className="facilities-category-name-content">
              <label>
                <input
                  type="checkbox"
                  checked={enabledCategories.indexOf(category.name) >= 0}
                  onChange={() => toggleCategory(category.name)}
                />
                {category.name}
              </label>
              <InfoboxButton id={category.name} clickedId={category.name} />
            </div>
          </div>
          <div className="layer-list">
            <ol className="layer-legend-items">
              {category.types.map((type) => (
                <li key={type.color} className="layer-legend-item">
                  {clickedId === `${category.name}-${type.name}` ? (
                    <Infobox id={type.name} />
                  ) : null}
                  <div className="layer-legend-item-content">
                    <LegendCircle color={type.color} />
                    {type.name}
                    <InfoboxButton
                      id={type.name}
                      clickedId={`${category.name}-${type.name}`}
                    />
                  </div>
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
