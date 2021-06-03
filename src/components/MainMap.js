import React, { useContext } from "react";

import { Context } from "store";
import BaseMap from "components/BaseMap";
import LayerPicker from "components/LayerPicker";
import "./MainMap.scss";

const MainMap = () => {
  const { dispatch } = useContext(Context);

  const handleMoveEnd = (map) => {
    const center = map.getCenter();
    dispatch({
      type: "set mapState",
      center: [center.lng, center.lat],
      zoom: [map.getZoom()],
    });
  };

  return (
    <BaseMap className="MainMap" onMoveEnd={handleMoveEnd}>
      <div className="controls">
        <LayerPicker />
      </div>
    </BaseMap>
  );
};

export default MainMap;
