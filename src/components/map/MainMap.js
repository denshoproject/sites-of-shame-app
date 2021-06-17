import React, { useContext } from "react";

import { Context } from "store";
import BaseMap from "components/map/BaseMap";
import Infobox from "components/ui/Infobox";
import LayerPicker from "components/ui/LayerPicker";
import "./MainMap.scss";

const MainMap = () => {
  const { dispatch, state } = useContext(Context);
  const { mapState } = state;
  const { clickedId, x, y } = state.infobox;

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
      {clickedId ? <Infobox id={clickedId} x={x} y={y} /> : null}
      <div className="controls">
        <LayerPicker />
      </div>
    </BaseMap>
  );
};

export default MainMap;
