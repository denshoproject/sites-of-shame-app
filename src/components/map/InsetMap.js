import React, { useContext } from "react";

import { Context } from "store";
import BaseMap from "components/map/BaseMap";
import { HAWAII_BOUNDS } from "constants.js";
import "./InsetMap.scss";

const InsetMap = () => {
  const { dispatch, state } = useContext(Context);
  const { insetMapState } = state;

  const handleClick = () => {
    dispatch({
      type: "set flyTo",
      flyTo: HAWAII_BOUNDS,
    });
  };

  return (
    <div className="inset-map-wrapper" onClick={handleClick}>
      <BaseMap
        bounds={HAWAII_BOUNDS}
        center={insetMapState.center}
        className="InsetMap"
        isInset={true}
        isInteractive={false}
        zoom={insetMapState.zoom}
      />
    </div>
  );
};

export default InsetMap;
