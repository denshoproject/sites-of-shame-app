import React, { useContext } from "react";

import { Context } from "store";
import BaseMap from "components/map/BaseMap";
import LayerPicker from "components/ui/LayerPicker";
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
      center={mapState.center}
      className="MainMap"
      includeZoomControls={true}
      isInteractive={true}
      onMoveEnd={handleMoveEnd}
      showPopups={true}
      zoom={mapState.zoom}
    >
      <div className="controls">
        <LayerPicker />
      </div>
    </BaseMap>
  );
};

export default MainMap;
