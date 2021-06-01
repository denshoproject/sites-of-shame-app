import React, { useContext, useRef } from "react";
import ReactMapboxGl, { Image, ZoomControl } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { constants } from "constants.js";
import { Context } from "store";
import LayerPicker from "components/LayerPicker";
import MapLayers from "components/MapLayers";
import PopupSwitch from "components/PopupSwitch";
import DiagonalGrid from "img/diagonal-grid.png";
import "./MainMap.scss";

const Map = ReactMapboxGl({
  accessToken: constants.MAPBOX_ACCESS_TOKEN,
});

const MainMap = () => {
  const { state, dispatch } = useContext(Context);
  const clickableLayerIds = useRef();
  const { mapState } = state;

  clickableLayerIds.current = state.layers
    .filter(({ clickable, enabled }) => clickable && enabled)
    .map(({ id }) => id);

  state.layers
    .filter(({ enabled }) => enabled)
    .forEach((layer) => {
      if (layer.clickableSublayers) {
        clickableLayerIds.current = [
          ...clickableLayerIds.current,
          ...layer.clickableSublayers,
        ];
      }
    });

  state.mapConfig = {
    center: [-93, 38],
    zoom: [4],
  };

  const handleMoveEnd = (map) => {
    const center = map.getCenter();
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
      clickedFeatureLngLat: event.lngLat || null,
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
        center={mapState.center}
        zoom={mapState.zoom}
        onMoveEnd={handleMoveEnd}
        onClick={handleClick}
      >
        <ZoomControl position="bottom-right" />
        <PopupSwitch />
        <Image id="diagonal-grid" url={DiagonalGrid} />
        <MapLayers />
      </Map>
    </div>
  );
};

export default MainMap;
