import React, { useContext } from "react";

import { Context } from "store";
import BaseMap from "components/map/BaseMap";
import { constants } from "constants.js";
import "./InsetMap.scss";

const InsetMap = () => {
  const { state } = useContext(Context);
  const { insetMapState } = state;

  return (
    <BaseMap
      bounds={constants.HAWAII_BOUNDS}
      center={insetMapState.center}
      className="InsetMap"
      isInset={true}
      isInteractive={false}
      zoom={insetMapState.zoom}
    />
  );
};

export default InsetMap;
