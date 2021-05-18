import React, { useContext } from "react";
import ReactMapboxGl from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Context } from "../store";
import LayerPicker from "./LayerPicker";
import MapLayers from "./MapLayers";
import "./MainMap.scss";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZWpmb3giLCJhIjoiY2lyZjd0bXltMDA4b2dma3JzNnA0ajh1bSJ9.iCmlE7gmJubz2RtL4RFzIw",
  scrollZoom: false
});

const MainMap = () => {
  const { state, dispatch } = useContext(Context);
  const clickableLayerIds = state.layers
    .filter(({ clickable }) => clickable)
    .map(({ id }) => id);

  const handleClick = (map, event) => {
    const features = map.queryRenderedFeatures(
      event.lngLat,
      { layers: clickableLayerIds }
    );
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
          height: '100%',
          width: '100%'
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