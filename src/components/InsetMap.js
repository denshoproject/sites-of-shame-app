import React, { useContext } from "react";

import { Context } from "store";
import BaseMap from "components/BaseMap";
import "./InsetMap.scss";

const InsetMap = () => {
  const { dispatch, state } = useContext(Context);
  const { insetMapState } = state;

  const handleMoveEnd = (map) => {
    const center = map.getCenter();
    dispatch({
      type: "set insetMapState",
      center: [center.lng, center.lat],
      zoom: [map.getZoom()],
    });
  };

  return (
    <BaseMap
      center={insetMapState.center}
      className="InsetMap"
      isInset={true}
      onMoveEnd={handleMoveEnd}
      zoom={insetMapState.zoom}
    />
  );
};

export default InsetMap;
