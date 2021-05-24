import React, { useContext, useRef } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { constants } from "../constants";

import { Context } from "../store";
import LayerPicker from "./LayerPicker";
import MapLayers from "./MapLayers";
import "./MainMap.scss";

const Map = ReactMapboxGl({
  accessToken: constants.MAPBOX_ACCESS_TOKEN,
  scrollZoom: false,
});

const MainMap = () => {
  const { state, dispatch } = useContext(Context);
  const clickableLayerIds = useRef();

  clickableLayerIds.current = state.layers
    .filter(({ clickable, enabled }) => clickable && enabled)
    .map(({ id }) => id);

  const handleClick = (map, event) => {
    const features = map.queryRenderedFeatures(event.point, {
      layers: clickableLayerIds.current,
    });
    dispatch({
      type: "set clickedFeature",
      clickedFeature: features[0] || null,
    });
  };

  return (
    <div className="MainMap">
      <div className="controls">
        <LayerPicker />
      </div>
      <Map
        // eslint-disable-next-line
        style={constants.MAPBOX_BASE_LAYER}
        containerStyle={{
          height: "100%",
          width: "100%",
        }}
        center={[-93, 38]}
        zoom={[4]}
        onClick={handleClick}
      >
        <MapLayers />
      </Map>
    </div>
  );
};

export default MainMap;
