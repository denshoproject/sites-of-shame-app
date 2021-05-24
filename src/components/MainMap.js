import React, { useContext, useRef } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { Context } from "../store";
import LayerPicker from "./LayerPicker";
import MapLayers from "./MapLayers";
import "./MainMap.scss";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZWpmb3giLCJhIjoiY2lyZjd0bXltMDA4b2dma3JzNnA0ajh1bSJ9.iCmlE7gmJubz2RtL4RFzIw",
  scrollZoom: false,
});

const MainMap = () => {
  const { state, dispatch } = useContext(Context);
  const clickableLayerIds = useRef();
  const { mapState } = state;

  clickableLayerIds.current = state.layers
    .filter(({ clickable, enabled }) => clickable && enabled)
    .map(({ id }) => id);

  state.mapConfig = {
    center: [-93, 38],
    zoom: [4],
  };

  const handleMoveEnd = (map) => {
    const center = map.getCenter();
    console.log("move end", map);
    dispatch({
      type: "set mapState",
      center: [center.lng, center.lat],
      zoom: [map.getZoom()],
    });
  };

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
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          height: "100%",
          width: "100%",
        }}
        center={mapState.center}
        zoom={mapState.zoom}
        onMoveEnd={handleMoveEnd}
        onClick={handleClick}
      >
        <MapLayers />
      </Map>
    </div>
  );
};

export default MainMap;
