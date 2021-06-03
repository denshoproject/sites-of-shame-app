import React, { useContext } from "react";

import { Context } from "store";
import BaseMap from "components/BaseMap";
import LayerPicker from "components/LayerPicker";
import "./MainMap.scss";

const MainMap = () => {
  const { dispatch, state } = useContext(Context);
  const { mapState } = state;

  const handleMoveEnd = (map) => {
    const center = map.getCenter();
    dispatch({
      type: "set mapState",
      center: [center.lng, center.lat],
      zoom: [map.getZoom()],
    });
  };

  return (
    <BaseMap
      className="MainMap"
      onMoveEnd={handleMoveEnd}
      center={mapState.center}
      zoom={mapState.zoom}
    >
      <div className="controls">
        <LayerPicker />
      </div>
    </BaseMap>
  );
};

export default MainMap;
