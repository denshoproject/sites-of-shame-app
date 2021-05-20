import React, { useContext } from "react";
import classNames from "classnames";

import { Context } from "../store";
import "./LayerPicker.scss";

const LayerPicker = () => {
  const { state, dispatch } = useContext(Context);
  // const layers = state.layers.filter(({ inPicker }) => inPicker);
  const layers = state.layers;
  const handleClick = (layer) =>
    dispatch({ type: "toggle layer", layerId: layer.id });

  return (
    <div className="layer-picker">
      <ol className="layer-list">
        {layers.map((layer) => (
          <li
            key={layer.id}
            className={classNames({
              layer: true,
              enabled: layer.enabled,
            })}
            onClick={() => handleClick(layer)}
          >
            {layer.name}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default LayerPicker;
